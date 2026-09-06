const { v4: uuidv4 } = require("uuid");
const ApiError = require("../../utils/ApiError");
const env = require("../../config/env");
const {
  hashPassword,
  comparePassword,
  hashToken,
  compareToken,
} = require("../../utils/password.utils");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  getRefreshTokenExpiryDate,
} = require("../../utils/jwt.utils");
const emailService = require("../../utils/email.service");
const userRepository = require("../users/user.repository");
const { toUserResponse } = require("../users/user.dto");
const authRepository = require("./auth.repository");
const { toAuthResponse, toTokenRefreshResponse } = require("./auth.dto");

class AuthService {
  async register({ username, email, phone, password }) {
    const existingEmail = await userRepository.findByEmail(email);

    if (existingEmail) {
      throw ApiError.conflict("Email is already registered");
    }

    const existingUsername = await userRepository.findByUsername(username);

    if (existingUsername) {
      throw ApiError.conflict("Username is already taken");
    }

    if (phone) {
      const existingPhone = await userRepository.findByPhone(phone);

      if (existingPhone) {
        throw ApiError.conflict("Phone number is already registered");
      }
    }

    const passwordHash = await hashPassword(password);

    const user = await userRepository.create({
      username,
      email,
      phone: phone || null,
      passwordHash,
    });

    return toUserResponse(user);
  }

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    if (user.status === "BANNED") {
      throw ApiError.forbidden("Your account has been banned");
    }

    if (user.status === "SUSPENDED") {
      throw ApiError.forbidden("Your account has been suspended");
    }

    const isValid = await comparePassword(password, user.password_hash);

    if (!isValid) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    const tokenPayload = { id: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    const tokenHash = await hashToken(refreshToken);
    const expiresAt = getRefreshTokenExpiryDate();

    await authRepository.saveRefreshToken(user.id, tokenHash, expiresAt);
    await userRepository.updateLastLogin(user.id);

    return toAuthResponse({
      user: toUserResponse(user),
      accessToken,
      refreshToken,
    });
  }

  async logout(refreshToken) {
    if (!refreshToken) {
      throw ApiError.badRequest("Refresh token is required");
    }

    try {
      const decoded = verifyRefreshToken(refreshToken);
      const activeTokens = await authRepository.findActiveRefreshTokensForUser(
        decoded.id,
      );

      for (const storedToken of activeTokens) {
        const isMatch = await compareToken(
          refreshToken,
          storedToken.token_hash,
        );

        if (isMatch) {
          await authRepository.revokeRefreshToken(storedToken.id);
          return;
        }
      }
    } catch {
      // Token may already be invalid/expired — treat logout as idempotent
    }
  }

  async refreshAccessToken(refreshToken) {
    if (!refreshToken) {
      throw ApiError.badRequest("Refresh token is required");
    }

    let decoded;

    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch {
      throw ApiError.unauthorized("Invalid or expired refresh token");
    }

    const user = await userRepository.findById(decoded.id);

    if (!user) {
      throw ApiError.unauthorized("User not found");
    }

    if (user.status !== "ACTIVE") {
      throw ApiError.forbidden(`Your account is ${user.status.toLowerCase()}`);
    }

    const activeTokens = await authRepository.findActiveRefreshTokensForUser(
      user.id,
    );
    let matchedToken = null;

    for (const storedToken of activeTokens) {
      const isMatch = await compareToken(refreshToken, storedToken.token_hash);

      if (isMatch) {
        matchedToken = storedToken;
        break;
      }
    }

    if (!matchedToken) {
      throw ApiError.unauthorized("Invalid or revoked refresh token");
    }

    const tokenPayload = { id: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(tokenPayload);

    return toTokenRefreshResponse(accessToken);
  }

  async forgotPassword(email) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      // Do not reveal whether email exists
      return { message: "If the email exists, a reset link has been sent" };
    }

    const resetToken = uuidv4();
    const tokenHash = await hashToken(resetToken);
    const expiresAt = new Date(Date.now() + env.passwordReset.tokenExpiresIn);

    await authRepository.savePasswordResetToken(user.id, tokenHash, expiresAt);

    await emailService.sendPasswordResetEmail({
      to: user.email,
      resetToken,
      userName: user.full_name || user.username,
    });

    const response = {
      message: "If the email exists, a reset link has been sent",
    };

    if (env.nodeEnv === "development") {
      response.resetToken = resetToken;
    }

    return response;
  }

  async resetPassword(token, newPassword) {
    const validTokens = await authRepository.findValidPasswordResetTokens();
    let matchedToken = null;

    for (const storedToken of validTokens) {
      const isMatch = await compareToken(token, storedToken.token_hash);

      if (isMatch) {
        matchedToken = storedToken;
        break;
      }
    }

    if (!matchedToken) {
      throw ApiError.badRequest("Invalid or expired reset token");
    }

    const passwordHash = await hashPassword(newPassword);

    await userRepository.updatePassword(matchedToken.user_id, passwordHash);
    await authRepository.markPasswordResetTokenUsed(matchedToken.id);
    await authRepository.revokeAllUserRefreshTokens(matchedToken.user_id);
  }
}

module.exports = new AuthService();

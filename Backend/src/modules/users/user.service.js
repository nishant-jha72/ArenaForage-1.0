const ApiError = require('../../utils/ApiError');
const { comparePassword, hashPassword } = require('../../utils/password.utils');
const userRepository = require('./user.repository');
const { toUserResponse } = require('./user.dto');

class UserService {
  async getCurrentUser(userId) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    return toUserResponse(user);
  }

  async updateProfile(userId, data) {
    if (data.phone) {
      const existingPhone = await userRepository.findByPhone(data.phone);

      if (existingPhone && existingPhone.id !== userId) {
        throw ApiError.conflict('Phone number is already registered');
      }
    }

    const updatedUser = await userRepository.updateProfile(userId, {
      fullName: data.full_name,
      phone: data.phone || null,
      profilePictureUrl: data.profile_picture_url || null,
    });

    if (!updatedUser) {
      throw ApiError.notFound('User not found');
    }

    return toUserResponse(updatedUser);
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    const isValid = await comparePassword(oldPassword, user.password_hash);

    if (!isValid) {
      throw ApiError.badRequest('Current password is incorrect');
    }

    const passwordHash = await hashPassword(newPassword);
    await userRepository.updatePassword(userId, passwordHash);
  }

async checkUsernameAvailability(username) {
  const existing = await userRepository.findByUsername(username);

  if (!existing || existing.length === 0) {
    return { available: true };
  }

  return { available: false };
}

  async getAllUsers(query) {
    const result = await userRepository.findAll({
      page: query.page,
      limit: query.limit,
      search: query.search,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      role: query.role,
      status: query.status,
    });

    return {
      users: result.users,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    };
  }

  async getUserById(id) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    return toUserResponse(user);
  }

  async banUser(id, currentUserId) {
    if (id === currentUserId) {
      throw ApiError.badRequest('You cannot ban your own account');
    }

    const user = await userRepository.findById(id);

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    if (user.role === 'SUPER_ADMIN') {
      throw ApiError.forbidden('Cannot ban a super admin');
    }

    const updated = await userRepository.updateStatus(id, 'BANNED');
    return toUserResponse(updated);
  }

  async suspendUser(id, currentUserId) {
    if (id === currentUserId) {
      throw ApiError.badRequest('You cannot suspend your own account');
    }

    const user = await userRepository.findById(id);

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    if (user.role === 'SUPER_ADMIN') {
      throw ApiError.forbidden('Cannot suspend a super admin');
    }

    const updated = await userRepository.updateStatus(id, 'SUSPENDED');
    return toUserResponse(updated);
  }

  async activateUser(id) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    const updated = await userRepository.updateStatus(id, 'ACTIVE');
    return toUserResponse(updated);
  }

  async deleteUser(id, currentUserId) {
    if (id === currentUserId) {
      throw ApiError.badRequest('You cannot delete your own account');
    }

    const user = await userRepository.findById(id);

    if (!user) {
      throw ApiError.notFound('User not found');
    }

    if (user.role === 'SUPER_ADMIN') {
      throw ApiError.forbidden('Cannot delete a super admin');
    }

    await userRepository.softDelete(id);
  }
}

module.exports = new UserService();

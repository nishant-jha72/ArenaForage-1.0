module.exports = {
  toUserResponse: (user) => {
    if (!user) return null;

    const {
      password_hash: _passwordHash,
      deleted_at: _deletedAt,
      ...safe
    } = user;

    return safe;
  },

  toUserListResponse: (users) =>
    users.map((user) => module.exports.toUserResponse(user)),
};

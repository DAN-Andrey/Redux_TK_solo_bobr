const jwtConfig = {
  // токен доступа - хранится в состоянии в React
  access: {
    expiresIn: 60, // минута
  },
  // токен обновления - хранится в cookie
  refresh: {
    expiresIn: 60 * 60 * 24, // сутки
  },
};

module.exports = jwtConfig;

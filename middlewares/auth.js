const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Пользователь не авторизовался'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'SecretKey');
  } catch (err) {
    next(new UnauthorizedError('Пользователь не авторизовался'));
  }

  req.user = payload;

  return next();
};

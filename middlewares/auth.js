const jwt = require('jsonwebtoken');
const UnautorizedError = require('../utils/errors/UnauthorizedError');

module.exports.SECRETKEY = 'VerySecretKey';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new UnautorizedError('Необходима авторизоваться'));
  }

  const token = authorization.replace('Bearer', '');
  let payload;

  try {
    payload = jwt.verify(token, this.SECRETKEY);
  } catch (err) {
    next(new UnautorizedError('Необходима авторизоваться'));
  }

  req.user = payload;

  return next();
};

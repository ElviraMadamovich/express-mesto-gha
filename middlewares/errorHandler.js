const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('../utils/constants');

const errorHandler = (err, res, req, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR ? 'Ошибка сервера' : err.message;
  res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;

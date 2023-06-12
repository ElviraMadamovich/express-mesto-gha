const NotFoundError = require('./NotFoundError');

const handleNotFoundError = (req, res, next) => next(new NotFoundError('Страница не найдена'));

module.exports = handleNotFoundError;

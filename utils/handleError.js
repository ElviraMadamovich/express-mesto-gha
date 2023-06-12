const NotFoundError = require('./NotFoundError');

const handleError = (req, res, next) => next(new NotFoundError('Страница не найдена'));

module.exports = handleError;

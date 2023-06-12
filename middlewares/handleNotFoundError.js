const NotFoundError = require('../utils/errors/NotFoundError');

const handleNotFoundError = (req, res, next) => next(new NotFoundError('Страница не найдена'));

module.exports = handleNotFoundError;

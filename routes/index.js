const routes = require('express').Router();

const users = require('./users');
const cards = require('./cards');
const NotFoundError = require('../utils/errors/NotFoundError');

routes.use('/users', users);
routes.use('/cards', cards);

routes.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = routes;

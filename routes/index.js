const routes = require('express').Router();

const users = require('./users');
const cards = require('./cards');

const { HTTP_STATUS_NOT_FOUND } = require('../utils/constants');

routes.use('/users', users);
routes.use('/cards', cards);

routes.use('*', (req, res) => {
  res
    .status(HTTP_STATUS_NOT_FOUND)
    .send({ message: 'Страница не найдена' });
});

module.exports = routes;

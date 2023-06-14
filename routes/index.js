const routes = require('express').Router();
const { errors } = require('celebrate');

const users = require('./users');
const cards = require('./cards');
const {
  login,
  createUser,
} = require('../controllers/users');
const {
  validateCreateUser,
  validateLogin,
} = require('../middlewares/dataValidation');
const NotFoundError = require('../utils/errors/NotFoundError');

routes.post('/users/signin', validateLogin, login);
routes.post('/users/signup', validateCreateUser, createUser);

routes.use('/users', users);
routes.use('/cards', cards);

routes.use('*', (req, res, next) => {
  const err = new NotFoundError('Страница не найдена');
  next(err);
});

routes.use(errors());

module.exports = routes;

const routes = require('express').Router();

const users = require('./users');
const cards = require('./cards');

const { validateCreateUser, validateLogin } = require('../middlewares/dataValidation');
const { login, createUser } = require('../controllers/users');

const NotFoundError = require('../utils/errors/NotFoundError');

routes.post('/signin', validateLogin, login);
routes.post('/signup', validateCreateUser, createUser);

routes.use('/users', users);
routes.use('/cards', cards);

routes.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = routes;

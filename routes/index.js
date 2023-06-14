const routes = require('express').Router();
const { errors } = require('celebrate');

const users = require('./users');
const cards = require('./cards');
const auth = require('../middlewares/auth');
const {
  login,
  createUser,
} = require('../controllers/users');
const {
  validateCreateUser,
  validateLogin,
} = require('../middlewares/dataValidation');
const NotFoundError = require('../utils/errors/NotFoundError');

routes.post('/signin', validateLogin, login);
routes.post('/signup', validateCreateUser, createUser);

routes.use('/users', auth, users);
routes.use('/cards', auth, cards);

routes.use('*', (req, res, next) => {
  const err = new NotFoundError('Страница не найдена');
  next(err);
});

routes.use(errors());

module.exports = routes;

const routes = require('express').Router();

const users = require('./users');
const cards = require('./cards');

const { auth } = require('../middlewares/auth');
const { handleNotFoundError } = require('../middlewares/handleNotFoundError');

routes.use('/users', users);
routes.use('/cards', cards);

routes.use('*', auth, handleNotFoundError);

module.exports = routes;

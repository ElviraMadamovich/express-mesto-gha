const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const handleNotFoundError = require('./middlewares/handleNotFoundError');
const auth = require('./middlewares/auth');
const { validateCreateUser, validateLogin } = require('./middlewares/dataValidation');
const { login, createUser } = require('./controllers/users');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use(auth, routes);

app.use('/*', auth, handleNotFoundError);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'Ошибка сервера' : message,
  });
  next();
});

app.listen(PORT);

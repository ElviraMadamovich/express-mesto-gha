const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('./utils/constants');
const routes = require('./routes');
const handleError = require('./utils/errors/handleError');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { userCreationValidation, loginValidation } = require('./middlewares/validate');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', loginValidation, login);
app.post('/signup', userCreationValidation, createUser);

app.use(auth, routes);

app.use('/*', auth, handleError);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode).send({
    message: statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR ? 'Ошибка сервера' : message,
  });
  next();
});

app.listen(PORT);

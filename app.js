const express = require('express');
const mongoose = require('mongoose');
const { HTTP_STATUS_NOT_FOUND } = require('./utils/constants');
const routes = require('./routes');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '647b0f1f7032001d33bd694a',
  };

  next();
});

app.use(routes);

app.use((req, res) => {
  res
    .status(HTTP_STATUS_NOT_FOUND)
    .send({ message: 'Страница не найдена' });
});

app.listen(PORT);

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { NotFoundError } = require('./utils/constants');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '647b0f1f7032001d33bd694a',
  };

  next();
});

app.use(userRoutes);
app.use(cardRoutes);

app.use((req, res) => {
  res
    .status(NotFoundError)
    .send({ message: 'Страница не найдена' });
});

app.listen(PORT);

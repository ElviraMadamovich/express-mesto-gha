/* eslint-disable no-shadow */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSample = require('../models/user');
const UnauthorizedError = require('../utils/UnauthorizedError');
const BadRequestError = require('../utils/BadRequestError');
const NotFoundError = require('../utils/NotFoundError');
const ConflictError = require('../utils/ConflictError');

const getUsers = (req, res, next) => {
  userSample
    .find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  userSample
    .findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Пользователь с указанным _id не найден'));
      }
      return next(err);
    });
};

const getUserById = (req, res, next) => {
  userSample
    .findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Пользователь с указанным _id не найден'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => userSample
    .create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
    .then(({
      name,
      about,
      avatar,
      email,
    }) => {
      res.status(201).send({
        name,
        about,
        avatar,
        email,
      });
    })
    .catch((err) => {
      if (err.name === 'MongoServerError') {
        return next(new ConflictError('Такой пользаватель уже существует'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    }));
};

const changeUserInfo = (req, res, { name, about, avatar }, next) => {
  userSample
    .findByIdAndUpdate(
      req.user._id,
      { name, about, avatar },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

const changeUser = (req, res, next) => {
  const { name, about } = req.body;
  changeUserInfo(req, res, { name, about }, next);
};

const changeAvatar = (req, res, next) => {
  const { avatar } = req.body;
  changeUserInfo(req, res, { avatar }, next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return userSample
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error) {
        return next(new UnauthorizedError('Неправильная почта или пароль'));
      }
      return next(err);
    });
};

module.exports = {
  getCurrentUser,
  login,
  getUsers,
  getUserById,
  createUser,
  changeUser,
  changeAvatar,
};

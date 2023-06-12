const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSample = require('../models/user');
const {
  HTTP_STATUS_CREATED,
} = require('../utils/constants');

const { SECRETKEY } = require('../middlewares/auth');

const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ConflictError = require('../utils/errors/ConflictError');
const InternalServerError = require('../utils/errors/InternalServerError');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return userSample
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRETKEY, {
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
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => userSample.create({
      ...req.body, password: hash,
    }))
    .then(({
      name, about, avatar, email, _id, createdAt,
    }) => {
      res.status(HTTP_STATUS_CREATED).send(
        {
          data: {
            name, about, avatar, email, _id, createdAt,
          },
        },
      );
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь уже зарегистрирован'));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Данные некорректны'));
      }
      return next(new InternalServerError('Ошибка сервера'));
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
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Пользователь не найден'));
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Данные некорректны'));
      }
      return next(err);
    });
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
        return next(new BadRequestError('Данные некорректны'));
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

module.exports = {
  getUsers,
  createUser,
  getUserById,
  changeUser,
  changeAvatar,
  getCurrentUser,
  login,
};

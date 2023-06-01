const UserSample = require('../models/user');

const {
  Ok, NotFoundError, BadRequestError,
} = require('../utils/constants');

const getUsers = (req, res, next) => {
  UserSample.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  UserSample.findById(userId)
    .then((user) => {
      if (!user) {
        res.send(user);
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  UserSample.create({ name, about, avatar })
    .then((user) => {
      res.status(Ok).send({
        name: user.name, about: user.about, avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'IncorrectDataError') {
        res.status(BadRequestError).send({
          message: 'Данные некорректны',
        });
      }
      return next(err);
    })
    .catch(next);
};

const changeUser = (req, res, next) => {
  const { name, about } = req.body;

  UserSample.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (user) return res.send({ user });

      throw NotFoundError('Пользователь не найден');
    })
    .catch((err) => {
      if (err.name === 'IncorrectDataError') {
        next(BadRequestError('Данные некорретны'));
      } else {
        next(err);
      }
      return next(err);
    });
};

const changeAvatar = (req, res, next) => {
  const { avatar } = req.body;

  UserSample.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (user) return res.send({ user });

      throw NotFoundError('Пользователь не найден');
    })
    .catch((err) => {
      if (err.name === 'IncorrectDataError') {
        next(BadRequestError('Данные некорректны'));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  UserSample.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  getUsers, getUser, createUser, changeUser, changeAvatar, getCurrentUser,
};

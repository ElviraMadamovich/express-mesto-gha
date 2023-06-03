const userSample = require('../models/user');
const {
  BadRequestError,
  NotFoundError,
  ServerError,
  OK,
} = require('../utils/constants');

const getUsers = (req, res) => {
  userSample
    .find({})
    .then((users) => {
      res.status(OK).send(users);
    })
    .catch((err) => {
      res.status(ServerError).send({
        message: err.message,
      });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userSample
    .create({ name, about, avatar })
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BadRequestError).send({
          message: 'Данные некорректны',
        });
      }
      return res.status(ServerError).send({
        message: 'Ошибка сервера',
      });
    });
};

const getUserById = (req, res) => {
  userSample
    .findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NotFoundError).send({
          message: 'Пользователь не найден',
        });
      }
      if (err.name === 'CastError') {
        return res.status(BadRequestError).send({
          message: 'Данные некорректны',
        });
      }
      return res.status(ServerError).send({
        message: 'Ошибка сервера',
      });
    });
};

const changeUser = (req, res) => {
  const { name, about } = req.body;
  userSample
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BadRequestError).send({
          message: 'Данные некорректны',
        });
      }
      return res.status(ServerError).send({
        message: 'Ошибка сервера',
      });
    });
};

const changeAvatar = (req, res) => {
  const { avatar } = req.body;
  userSample
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => {
      res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BadRequestError).send({
          message: 'Данные некорректны',
        });
      }
      return res.status(ServerError).send({
        message: 'Ошибка сервера',
      });
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  changeUser,
  changeAvatar,
};

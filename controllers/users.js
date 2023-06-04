const mongoose = require('mongoose');

const userSample = require('../models/user');
const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_CREATED,
} = require('../utils/constants');

const getUsers = (req, res) => {
  userSample
    .find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        message: 'Ошибка сервера',
      });
      console.log(err);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userSample
    .create({ name, about, avatar })
    .then((user) => {
      res.status(HTTP_STATUS_CREATED).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({
          message: 'Данные некорректны',
        });
      }
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        message: 'Ошибка сервера',
      });
    });
};

const getUserById = (req, res) => {
  userSample
    .findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.NotFoundError) {
        return res.status(HTTP_STATUS_NOT_FOUND).send({
          message: 'Пользователь не найден',
        });
      }
      if (err instanceof mongoose.Error.CastError) {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({
          message: 'Данные некорректны',
        });
      }
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        message: 'Ошибка сервера',
      });
    });
};

const changeUserInfo = (req, res, userInfo, userAvatar) => {
  userSample
    .findByIdAndUpdate(
      req.user._id,
      userInfo,
      userAvatar,
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(HTTP_STATUS_BAD_REQUEST).send({
          message: 'Данные некорректны',
        });
      }
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        message: 'Ошибка сервера',
      });
    });
};

const changeUser = (req, res) => {
  const userInfo = req.body;
  changeUserInfo(req, res, userInfo);
};

const changeAvatar = (req, res) => {
  const userAvatar = req.body;
  changeUserInfo(req, res, userAvatar);
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  changeUser,
  changeAvatar,
};

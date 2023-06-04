const mongoose = require('mongoose');

const cardSample = require('../models/card');
const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_CREATED,
} = require('../utils/constants');

const createCard = (req, res) => {
  const { name, link } = req.body;

  cardSample
    .create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(HTTP_STATUS_CREATED).send(card);
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

const getCards = (req, res) => {
  cardSample
    .find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        message: 'Ошибка сервера',
      });
      console.log(err);
    });
};

const deleteCard = (req, res) => {
  cardSample
    .findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.NotFoundError) {
        return res.status(HTTP_STATUS_NOT_FOUND).send({
          message: 'Карточка не найдена',
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

const likeCard = (req, res) => {
  cardSample
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.NotFoundError) {
        return res.status(HTTP_STATUS_NOT_FOUND).send({
          message: 'Карточка не найдена',
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

const dislikeCard = (req, res) => {
  cardSample
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.NotFoundError) {
        return res.status(HTTP_STATUS_NOT_FOUND).send({
          message: 'Карточка не найдена',
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

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};

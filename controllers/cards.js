const cardSample = require('../models/card');
const {
  BadRequestError,
  NotFoundError,
  ServerError,
  OK,
} = require('../utils/constants');

const createCard = (req, res) => {
  const { name, link } = req.body;

  cardSample
    .create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(OK).send(card);
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

const getCards = (req, res) => {
  cardSample
    .find({})
    .then((cards) => {
      res.status(OK).send(cards);
    })
    .catch((err) => {
      res.status(ServerError).send({
        message: err.message,
      });
    });
};

const deleteCard = (req, res) => {
  cardSample
    .findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => {
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NotFoundError).send({
          message: 'Карточка не найдена',
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

const likeCard = (req, res) => {
  cardSample
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((card) => {
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NotFoundError).send({
          message: 'Карточка не найдена',
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

const dislikeCard = (req, res) => {
  cardSample
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail()
    .then((card) => {
      res.status(OK).send(card);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NotFoundError).send({
          message: 'Карточка не найдена',
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

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};

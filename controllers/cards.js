const CardSample = require('../models/card');
const {
  BadRequest,
  NotFound,
  Success,
  ServerError,
} = require('../utils/constants');

const getCards = (req, res) => {
  CardSample.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(ServerError).send({ message: 'Ошибка сервера' });
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  CardSample.create({ name, link, owner: req.user._id })
    .then((card) => res.status(Success).send({ card }))
    .catch((err) => {
      if (err.name === 'IncorrectDataError') {
        return next(BadRequest('Данные некорректны'));
      }
      return next(err);
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  CardSample.findByIdAndDelete(cardId)
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        return res.status(NotFound).send({
          message: 'Карточка не найдена',
        });
      }
      if (err.name === 'CastError') {
        return res.status(BadRequest).send({
          message: 'Данные некорректны',
        });
      } return res.status(ServerError).send({
        message: 'Ошибка сервера',
      });
    });
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;

  CardSample.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'IncorrectDataError') {
        return next(BadRequest('Данные некорректны'));
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  CardSample.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'IncorrectDataError') {
        return next(BadRequest('Данные некорректны'));
      }
      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};

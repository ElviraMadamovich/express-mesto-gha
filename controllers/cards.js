const CardSample = require('../models/card');
const { BadRequest, NotFound, Success } = require('../utils/constants');

const getCards = (req, res, next) => {
  CardSample.find({})
    .then((cards) => res.send({ cards }))
    .catch((err) => next(err));
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

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  CardSample.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        if (!card) throw NotFound('Карточка не найдена');
      }
      return res.send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err.name === 'IncorrectDataError') {
        return next(BadRequest('Данные некорректны'));
      }
      return next(err);
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

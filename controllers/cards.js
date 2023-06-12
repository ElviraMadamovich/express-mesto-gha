const mongoose = require('mongoose');

const cardSample = require('../models/card');
const {
  HTTP_STATUS_CREATED,
} = require('../utils/constants');

const ForbiddenError = require('../utils/errors/ForbiddenError');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const InternalServerError = require('../utils/errors/InternalServerError');

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  cardSample
    .create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(HTTP_STATUS_CREATED).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Данные некорректны'));
      }
      return next(err);
    });
};

const getCards = (req, res, next) => {
  cardSample
    .find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  cardSample
    .findById(req.params.cardId)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((cardDoc) => {
      if (req.user._id !== cardDoc.owner.toString()) {
        return next(new ForbiddenError('Нельзя удалять чужую карточку'));
      }
      return cardSample.findByIdAndRemove(req.params.cardId);
    })
    .then((card) => res.send({ message: `Карточка _id:${card._id} удалена` }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Данные некорректны'));
      }
      return next(new InternalServerError('Ошибка сервера'));
    });
};

const likeCard = (req, res, next) => {
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
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Карточка не найдена'));
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Данные некорректны'));
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
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
      if (err instanceof mongoose.Error.DocumentNotFoundErrorError) {
        return next(new NotFoundError('Карточка не найдена'));
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Данные некорректны'));
      }
      return next(err);
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};

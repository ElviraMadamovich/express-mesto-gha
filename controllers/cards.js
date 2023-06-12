const mongoose = require('mongoose');

const cardSample = require('../models/card');
const {
  HTTP_STATUS_CREATED,
} = require('../utils/constants');

const ForbiddenError = require('../utils/errors/ForbiddenError');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');

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
    .findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => {
      cardSample
        .deleteOne({ _id: card._id, owner: req.user._id })
        .then((result) => {
          if (result.deletedCount === 0) {
            next(new ForbiddenError('Нельзя удалять чужую карточку'));
          } else {
            res.send({ message: 'Карточка удалена' });
          }
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Карточка не найдена'));
      }
      return next(err);
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

const { celebrate, Joi } = require('celebrate');

const regex = /^https*:\/\/(www\.)*[-a-zA-Z0-9@:%._+~#=]{1,}\.[a-zA-Z0-9()]([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/i;

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

const validateChangeUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateChangeAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regex),
  }),
});

const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regex),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validateLogin,
  validateCreateUser,
  validateGetUserById,
  validateChangeUser,
  validateChangeAvatar,
  validateCardId,
  validateCreateCard,
};

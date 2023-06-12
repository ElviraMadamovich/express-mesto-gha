const { celebrate, Joi } = require('celebrate');

const regex = /^https*:\/\/(www\.)*[-a-zA-Z0-9@:%._+~#=]{1,}\.[a-zA-Z0-9()]([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/i;

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const getUsersByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

const userCreationValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const userChangeValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const avatarChangeValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regex),
  }),
});

const cardCreationValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regex),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  avatarChangeValidation,
  getUsersByIdValidation,
  userCreationValidation,
  userChangeValidation,
  loginValidation,
  cardCreationValidation,
  cardIdValidation,
};

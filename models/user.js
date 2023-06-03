const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator: (link) => validator.isURL(link),
        message: 'Введите URL',
      },
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);

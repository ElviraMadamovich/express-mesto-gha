const mongoose = require('mongoose');
const { defaultImageLink } = require('../utils/constants');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
    default: 'Одри Хепберн',
  },
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
    default: 'Актриса',
  },
  avatar: {
    type: String,
    requred: true,
    default: 'https://66.media.tumblr.com/fe8dcb87220552723c7df448ead5b7e5/tumblr_l2s63mFjm11qbilh4o1_r1_1280.jpg',
    validate: {
      validator: (avatar) => defaultImageLink.test(avatar),
      message: 'Введите url',
    },
  },
});

module.exports = mongoose.model('user', userSchema);

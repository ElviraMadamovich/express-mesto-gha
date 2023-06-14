const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  changeUser,
  changeAvatar,
  login,
  createUser,
} = require('../controllers/users');

const {
  validateGetUserById,
  validateChangeUser,
  validateChangeAvatar,
  validateCreateUser,
  validateLogin,
} = require('../middlewares/dataValidation');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateGetUserById, getUserById);
router.patch('/me', validateChangeUser, changeUser);
router.patch('/me/avatar', validateChangeAvatar, changeAvatar);

module.exports = router;

const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getCurrentUser,
  changeUser,
  changeAvatar,
} = require('../controllers/users');

const {
  validateGetUserById,
  validateChangeUser,
  validateChangeAvatar,
} = require('../middlewares/dataValidation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateGetUserById, getUserById);
router.patch('/me', validateChangeUser, changeUser);
router.patch('/me/avatar', validateChangeAvatar, changeAvatar);

module.exports = router;

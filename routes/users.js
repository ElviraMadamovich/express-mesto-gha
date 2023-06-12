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
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateGetUserById, getUserById);
router.patch('/me/avatar', validateChangeAvatar, changeAvatar);
router.patch('/me', validateChangeUser, changeUser);

module.exports = router;

const router = require('express').Router();

const {
  getUsers,
  createUser,
  getUserById,
  changeUser,
  changeAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.post('/users', createUser);
router.patch('/users/me/avatar', changeAvatar);
router.patch('/users/me', changeUser);

module.exports = router;

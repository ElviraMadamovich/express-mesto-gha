const router = require('express').Router();

const {
  getUsers,
  createUser,
  getUserById,
  changeUser,
  changeAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.post('/users', createUser);
router.get('/users/:userId', getUserById);
router.patch('/users/me', changeUser);
router.patch('/users/me/avatar', changeAvatar);

module.exports = router;

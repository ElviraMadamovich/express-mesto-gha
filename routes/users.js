const router = require('express').Router();

const {
  getUsers,
  getUser,
  changeUser,
  changeAvatar,
  getCurrentUser,
  createUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', getUser);
router.post('/users', createUser);
router.patch('/users/me', changeUser);
router.patch('/users/me/avatar', changeAvatar);

module.exports = router;

const router = require('express').Router();

const {
  getUsers,
  createUser,
  getUserById,
  changeUser,
  changeAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUserById);
router.patch('/me', changeUser);
router.patch('/me/avatar', changeAvatar);

module.exports = router;

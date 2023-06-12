const router = require('express').Router();

const {
  getUsers,
  createUser,
  getUserById,
  changeUser,
  changeAvatar,
} = require('../controllers/users');

const {
  getUsersByIdValidation,
  userChangeValidation,
  avatarChangeValidation,
} = require('../middlewares/validate');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUsersByIdValidation, getUserById);
router.patch('/me', avatarChangeValidation, changeUser);
router.patch('/me/avatar', userChangeValidation, changeAvatar);

module.exports = router;

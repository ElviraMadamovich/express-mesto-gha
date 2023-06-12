const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { cardCreationValidation, cardIdValidation } = require('../middlewares/validate');

router.get('/', getCards);
router.post('/', cardCreationValidation, createCard);
router.delete('/:cardId', cardIdValidation, deleteCard);
router.put('/:cardId/likes', cardIdValidation, likeCard);
router.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = router;

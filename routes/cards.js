const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCardById,
  addLike,
  removeLike,
} = require('../controllers/cards');
const { cardValidation, cardIdValidation } = require('../middlewares/validationJoi');

router.get('/', auth, getCards);
router.post('/', auth, cardValidation, createCard);
router.delete('/:cardId', auth, cardIdValidation, deleteCardById);
router.put('/:cardId/likes', auth, cardIdValidation, addLike);
router.delete('/:cardId/likes', auth, cardIdValidation, removeLike);

module.exports = router;

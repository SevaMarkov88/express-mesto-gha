const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCardById,
  addLike,
  removeLike,
} = require('../controllers/cards');
const { cardValidation, idValidation } = require('../middlewares/validationJoi');

router.get('/', auth, getCards);
router.post('/', auth, cardValidation, createCard);
router.delete('/:cardId', auth, idValidation, deleteCardById);
router.put('/:cardId/likes', auth, idValidation, addLike);
router.delete('/:cardId/likes', auth, idValidation, removeLike);

module.exports = router;

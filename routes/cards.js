const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCardById,
  addLike,
  removeLike,
} = require('../controllers/cards');

router.get('/', auth, getCards);
router.post('/', auth, createCard);
router.delete('/:cardId', auth, deleteCardById);
router.put('/:cardId/likes', auth, addLike);
router.delete('/:cardId/likes', auth, removeLike);

module.exports = router;

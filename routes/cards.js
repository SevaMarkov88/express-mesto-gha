const {
  getCards,
  createCard,
  deleteCardById,
  addLike,
  removeLike
} = require('../controllers/cards');
const router = require("express").Router();

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCardById);
router.put('/cards/:cardId/likes', addLike);
router.delete('/cards/:cardId/likes', removeLike);

module.exports = router;
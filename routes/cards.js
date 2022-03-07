const { getCards, createCard, deleteCardById } = require('../controllers/cards');
const router = require("express").Router();

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCardById);

module.exports = router;
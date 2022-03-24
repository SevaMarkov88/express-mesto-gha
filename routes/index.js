const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { BadRequestError } = require('../errors/BadRequestError');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((req, res, next) => {
  next(new BadRequestError('Страница по указанному маршруту не найдена'));
});

module.exports = router;

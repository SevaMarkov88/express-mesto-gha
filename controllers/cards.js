/* eslint-disable no-underscore-dangle */
const Cards = require('../model/card');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      if (err instanceof BadRequest) {
        return res.status(400).send(new BadRequest('Переданы некорректные данные'));
      }
      if (err instanceof NotFound) {
        return res.status(404).send(new NotFound('Карточки не найдены'));
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Cards.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err instanceof BadRequest) {
        return res.status(400).send(new BadRequest('Переданы некорректные данные'));
      }
      if (err instanceof NotFound) {
        return res.status(404).send(new NotFound('Карточки не найдены'));
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCardById = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err instanceof BadRequest) {
        return res.status(400).send(new BadRequest('Переданы некорректные данные'));
      }
      if (err instanceof NotFound) {
        return res.status(404).send(new NotFound('Карточки не найдены'));
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.addLike = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((likes) => res.status(200).send({ data: likes }))
    .catch((err) => {
      if (err instanceof BadRequest) {
        return res.status(400).send(new BadRequest('Переданы некорректные данные'));
      }
      if (err instanceof NotFound) {
        return res.status(404).send(new NotFound('Карточки не найдены'));
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.removeLike = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((likes) => res.status(200).send({ data: likes }))
    .catch((err) => {
      if (err instanceof BadRequest) {
        return res.status(400).send(new BadRequest('Переданы некорректные данные'));
      }
      if (err instanceof NotFound) {
        return res.status(404).send(new NotFound('Карточки не найдены'));
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

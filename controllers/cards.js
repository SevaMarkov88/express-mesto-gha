/* eslint-disable no-underscore-dangle */
const Cards = require('../model/card');
const { ERROR_CODE_400, ERROR_CODE_404, ERROR_CODE_500 } = require('../errors/errorsCode');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(ERROR_CODE_500).send({ message: 'Ошибка по умолчанию.', ...err }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Cards.create({ name, link, owner: ownerId })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_400).send({ message: 'Проверьте введенные данные' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка по умолчанию.', ...err });
    });
};

module.exports.deleteCardById = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(ERROR_CODE_404).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_400).send({ message: 'Проверьте введенные данные' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка по умолчанию.', ...err });
    });
};

module.exports.addLike = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(ERROR_CODE_404).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_400).send({ message: 'Проверьте введенные данные' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка по умолчанию.', ...err });
    });
};

module.exports.removeLike = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send(card);
      } else {
        res.status(ERROR_CODE_404).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_400).send({ message: 'Проверьте введенные данные' });
      }
      return res.status(ERROR_CODE_500).send({ message: 'Ошибка по умолчанию.', ...err });
    });
};

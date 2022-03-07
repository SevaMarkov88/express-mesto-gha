const Cards = require('../model/card');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');


module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.send(cards))
    .catch(err => {
      if (err instanceof BadRequest) {
        return res.status(400).send({message: 'Переданы некорректные данные'})
      }
      if (err instanceof NotFound) {
        return res.status(404).send({message: 'Карточки не найдены'})
      }
      return res.status(500).send({ message: 'Произошла ошибка' })
    })
}

module.exports.createCard = (req, res) => {
  const { name, link} = req.body;
  Cards.create({name, link, owner: req.user._id})
    .then((card) => res.send(card))
    .catch(err => {
      if (err instanceof BadRequest) {
        return res.status(400).send({message: 'Переданы некорректные данные'})
      }
      if (err instanceof NotFound) {
        return res.status(404).send({message: 'Карточки не найдены'})
      }
      return res.status(500).send({ message: 'Произошла ошибка' })
    })
};

module.exports.deleteCardById = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send(card))
    .catch(err => {
      if (err instanceof BadRequest) {
        return res.status(400).send({message: 'Переданы некорректные данные'})
      }
      if (err instanceof NotFound) {
        return res.status(404).send({message: 'Карточки не найдены'})
      }
      return res.status(500).send({ message: 'Произошла ошибка' })
    })
};

module.exports.addLike = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true}
  )
    .then(likes => res.send({data: likes}))
    .catch(err => {
      if (err instanceof BadRequest) {
        return res.status(400).send({message: 'Переданы некорректные данные'})
      }
      if (err instanceof NotFound) {
        return res.status(404).send({message: 'Карточки не найдены'})
      }
      return res.status(500).send({ message: 'Произошла ошибка' })
    })
};

module.exports.removeLike = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true}
  )
    .then(likes => res.send({data: likes}))
    .catch(err => {
      if (err instanceof BadRequest) {
        return res.status(400).send({message: 'Переданы некорректные данные'})
      }
      if (err instanceof NotFound) {
        return res.status(404).send({message: 'Карточки не найдены'})
      }
      return res.status(500).send({ message: 'Произошла ошибка' })
    })
}
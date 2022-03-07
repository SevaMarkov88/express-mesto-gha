const Cards = require('../model/card');


module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
}

module.exports.createCard = (req, res) => {
  const { name, link} = req.body;
  Cards.create({name, link, owner: req.user._id})
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
};

module.exports.deleteCardById = (req, res) => {
  Cards.findByIdAndRemove(req.params.id)
    .then((card) => res.send(card))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
}
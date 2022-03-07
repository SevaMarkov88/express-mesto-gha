const User = require('../model/user');
const BadRequest = require("../errors/BadRequest");
const NotFound = require("../errors/NotFound");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(err => {
      if (err instanceof BadRequest) {
        return res.status(400).send({message: 'Переданы некорректные данные'})
      }
      return res.status(500).send({ message: 'Произошла ошибка' })
    })
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send({ data: user }))
    .catch(err => {
      if (err instanceof BadRequest) {
        return res.status(400).send({message: 'Переданы некорректные данные'})
      }
      if (err instanceof NotFound) {
        return res.status(404).send({message: 'Пользователи не найдены'})
      }
      return res.status(500).send({ message: 'Произошла ошибка' })
    })
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({data: user}))
    .catch(err => {
      if (err instanceof BadRequest) {
        return res.status(400).send({message: 'Переданы некорректные данные'})
      }
      if (err instanceof NotFound) {
        return res.status(404).send({message: 'Пользователи не найдены'})
      }
      return res.status(500).send({ message: 'Произошла ошибка' })
    })
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id,{name, about})
    .then(user => res.send({data: user}))
    .catch(err => {
      if (err instanceof BadRequest) {
        return res.status(400).send({message: 'Переданы некорректные данные'})
      }
      if (err instanceof NotFound) {
        return res.status(404).send({message: 'Пользователи не найдены'})
      }
      return res.status(500).send({ message: 'Произошла ошибка' })
    })
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then(user => res.send({data: user}))
    .catch(err => {
      if (err instanceof BadRequest) {
        return res.status(400).send({message: 'Переданы некорректные данные'})
      }
      if (err instanceof NotFound) {
        return res.status(404).send({message: 'Пользователи не найдены'})
      }
      return res.status(500).send({ message: 'Произошла ошибка' })
    })
}
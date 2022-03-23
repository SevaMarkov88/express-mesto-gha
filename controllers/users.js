const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const BadRequestError = require('../errors/BadRequestError');
const {
  ERROR_CODE_400,
  ERROR_CODE_404,
  ERROR_CODE_500,
} = require('../errors/errorsCode');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res
      .status(ERROR_CODE_500)
      .send({ message: 'Ошибка по умолчанию.', ...err }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(200)
          .send(user);
      } else {
        res.status(ERROR_CODE_404)
          .send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res
          .status(ERROR_CODE_400)
          .send({ message: 'Проверьте введенные данные' });
      }
      return res
        .status(ERROR_CODE_500)
        .send({ message: 'Ошибка по умолчанию.', ...err });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))

    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE_400)
          .send({ message: 'Проверьте введенные данные' });
      }
      return res
        .status(ERROR_CODE_500)
        .send({ message: 'Ошибка по умолчанию.', ...err });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const {
    name,
    about,
  } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        return res.status(200)
          .send({ data: user });
      }
      return res
        .status(ERROR_CODE_404)
        .send({ message: 'Пользователь не найден' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res
          .status(ERROR_CODE_400)
          .send({ message: 'Проверьте введенные данные' });
      }
      return res
        .status(ERROR_CODE_500)
        .send({ message: 'Ошибка по умолчанию.', ...err });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        res.status(200)
          .send({ data: user });
      } else {
        res.status(ERROR_CODE_404)
          .send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res
          .status(ERROR_CODE_400)
          .send({ message: 'Проверьте введенные данные' });
      }
      return res
        .status(ERROR_CODE_500)
        .send({ message: 'Ошибка по умолчанию.', ...err });
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.status(201).send({ token });
    })
    .catch((err) => {
      if (err.message === 'IncorrectEmail') {
        next(new BadRequestError('Указан некорректный Email или пароль.'));
      } else {
        next(err);
      }
    });
};

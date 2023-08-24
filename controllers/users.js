const User = require('../models/user');

// возвращает всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => next(err));
};

// возвращает пользователя по _id
const getUserById = (req, res, next) => {
  const { userId } = req.params;
  const ERROR_CODE = 404;

  User.findById(userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(ERROR_CODE).send('Запрашиваемый пользователь не найден');
      } else {
        next(err);
      }
    });
};

// создаёт пользователя
const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  const ERROR_CODE = 400;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    }))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(ERROR_CODE).send('Переданы неверные данные пользователя');
      } else {
        next(err);
      }
    });
};

// обновляет профиль
const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  const ERROR_CODE = 400;

  User.findByIdAndUpdate(userId, { name, about })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(ERROR_CODE).send('Переданы неверные данные пользователя');
      } else {
        next(err);
      }
    });
};

// обновляет аватар
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  const ERROR_CODE = 400;

  User.findByIdAndUpdate(userId, { avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(ERROR_CODE).send('Переданы неверные данные пользователя');
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
};

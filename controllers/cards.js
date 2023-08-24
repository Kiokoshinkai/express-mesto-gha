const Card = require('../models/card');

// возвращает все карточки
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => next(err));
};

// создаёт карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  const ERROR_CODE = 400;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(ERROR_CODE).send('Переданы неверные данные');
      } else {
        next(err);
      }
    });
};

// удаляет карточку по идентификатору
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const ERROR_CODE = 404;

  Card.deleteOne({ _id: cardId })
    .then(() => res.status(200))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(ERROR_CODE).send('Запрашиваемый пользователь не найден');
      } else {
        next(err);
      }
    });
};

// поставить лайк карточке
const addLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  const ERROR_CODE = 404;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(ERROR_CODE).send('Запрашиваемый пользователь не найден');
      } else {
        next(err);
      }
    });
};

// убрать лайк с карточки
const removeLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  const ERROR_CODE = 404;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(ERROR_CODE).send('Запрашиваемый пользователь не найден');
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};

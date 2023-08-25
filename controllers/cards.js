const Card = require('../models/card');

// возвращает все карточки
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

// создаёт карточку
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.message === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
      } else {
        next(err);
      }
    });
};

// удаляет карточку по идентификатору
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.deleteOne({ _id: cardId })
    .orFail(new Error('NotValidId'))
    .then(() => res.status(200))
    .catch((err) => {
      if (err.message === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные при удалении карточки.' });
      } else if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        next(err);
      }
    });
};

// поставить лайк карточке
const addLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка.' });
      } else if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
      } else {
        next(err);
      }
    });
};

// убрать лайк с карточки
const removeLike = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.message === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные для снятия лайка.' });
      } else if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
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

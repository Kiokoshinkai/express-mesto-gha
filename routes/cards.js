const express = require('express');

const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

const cardsRouter = express.Router();

cardsRouter.get('/cards', getCards);

cardsRouter.post('/cards', createCard);

cardsRouter.delete('/cards/:cardId', deleteCard);

cardsRouter.put('/cards/:cardId/likes', addLike);

cardsRouter.delete('/cards/:cardId/likes', removeLike);

module.exports = cardsRouter;

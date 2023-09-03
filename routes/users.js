const express = require('express');
const { celebrate, Joi, Segments } = require('celebrate');

const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

const urlRegex = require('../utils/regex');

const userRouter = express.Router();

const profileSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  about: Joi.string().min(2).max(30).required(),
});

const avatarSchema = Joi.object({
  avatar: Joi.string().pattern(urlRegex),
});

userRouter.get('/users', getUsers);

userRouter.get('/users/:userId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().hex().required(),
  }),
}), getUserById);

userRouter.patch('/users/me', celebrate({
  [Segments.BODY]: profileSchema,
}), updateProfile);

userRouter.patch('/users/me/avatar', celebrate({
  [Segments.BODY]: avatarSchema,
}), updateAvatar);

userRouter.get('/users/me', getUserInfo);

module.exports = userRouter;

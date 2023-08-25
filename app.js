const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

// подключаемся к серверу mongo
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(helmet());

// подключаем маршруты для пользователей и карточек
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
});

// запуск сервера на заданном порту
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

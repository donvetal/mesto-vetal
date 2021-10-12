const express = require('express');
require('dotenv').config();
console.log(require('dotenv').config());
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { login } = require('./controllers/user');
const { successfulAuth } = require('./controllers/user');
const { logout } = require('./controllers/user');
const { createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const whiteList = ['http://vitaliymontana.students.nomoredomains.club',
  'https://vitaliymontana.students.nomoredomains.club',
  'https://localhost:3000',
  'http://localhost:3000'];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    }
  },
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
// app.use(cors(corsOptions));
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(requestLogger); // подключаем логгер запросов

// Краш-теста (сервер поднимится после падения сам, благодаря pm2)
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/([\w+]+:\/\/)?([\w\d-]+\.)*[\w-]+[.:]\w+([/?=&#]?[\w-]+)*\/?#?/),
  }),
}), createUser);
app.use(auth);
app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.get('/check-auth', successfulAuth);
app.get('/logout', logout);

app.use((req, res) => {
  throw new NotFoundError('Извините, страница не найдена!');
});
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;
  // проверяем статус и выставляем сообщение в зависимости от него
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { login } = require('./controllers/user');
const { createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const enableCORS = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PATCH, PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, token, Content-Length, X-Requested-With, *');
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.use(enableCORS);
// app.use(function (req, res, next) {
//   const requestHeaders = req.headers['access-control-request-headers'];
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Headers', requestHeaders);
//   res.header('Access-Control-Allow-Credentials', true);
//   next();
// });
// app.use((req, res, next) => {
//   // проверяем, что источник запроса есть среди разрешённых
//   const { method } = req.method;
//   const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';
//   const requestHeaders = req.headers['access-control-request-headers'];
//   // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
//   res.header('Access-Control-Allow-Origin', '*');
//
//   if (method === 'OPTIONS') {
//     // разрешаем кросс-доменные запросы любых типов (по умолчанию)
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     // разрешаем кросс-доменные запросы с этими заголовками
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//   }
//
//   next();
// });
app.use(cookieParser());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(requestLogger); // подключаем логгер запросов

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

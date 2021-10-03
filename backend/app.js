const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req,
  res,
  next) => {
  req.user = {
    _id: '6144225acd60445927b67bd7',
  };
  next();
});
app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use((req, res) => {
  res.status(404).send({ message: 'Извините, страница не найдена!' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

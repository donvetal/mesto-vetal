const Card = require('../models/card');
const BadRequestErr = require('../errors/bad-request-err');
const ForbiddenErr = require('../errors/forbidden-err');
const NotFoundErr = require('../errors/not-found-err');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestErr('Некорректные данные ');
      } else {
        next(err);
      }
    })
    .catch(next);
};
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Нет карточки по заданному id');
      }
      if (card.owner.toString() === req.user._id.toString()) {
        return Card.findByIdAndRemove(req.params.id)
          .then(res.send({ data: card }))
          .catch(next);
      }
      throw new ForbiddenErr('Запрещено. У клиента нет прав доступа к содержимому!');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestErr('Невалидный id.');
      } else if (err.statusCode === 404) {
        throw new NotFoundErr('Нет карточки по заданному id');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Нет карточки по заданному id');
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestErr('Невалидный id.');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Нет карточки по заданному id');
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestErr('Невалидный id.');
      } else {
        next(err);
      }
    })
    .catch(next);
};

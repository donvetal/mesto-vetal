const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/([\w+]+:\/\/)?([\w\d-]+\.)*[\w-]+[.:]\w+([/?=&#]?[\w-]+)*\/?#?/),
  }),
}), createCard);
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), deleteCard);
router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), likeCard);
router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), dislikeCard);
module.exports = router;

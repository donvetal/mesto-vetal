const validator = require('validator');
const BadRequestErr = require('../errors/bad-request-err');

module.exports.validateLink = (value) => {
  const result = validator.isURL(value);
  if (result) return value;
  throw new BadRequestErr('Передан неверный формат ссылки!');
};

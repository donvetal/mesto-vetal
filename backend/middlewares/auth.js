const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/unauthorized-err');
const ForbiddenErr = require('../errors/forbidden-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedErr('Необходима авторизация');
  }
  let payload;
  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    throw new ForbiddenErr('Запрещено, нет прав доступа к содержимому!');
  }
  req.user = payload;
  next();
};

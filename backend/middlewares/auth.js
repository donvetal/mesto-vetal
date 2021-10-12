const { NODE_ENV, JWT_SECRET } = process.env;
// const isProduction = process.env.NODE_ENV === 'production'; // if production, we use secret from env file
// const JWT_SECRET = isProduction ? process.env.JWT_SECRET : 'devSecretKey'; // for dev mode, we use 'devSecretKey'
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
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    // payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    throw new ForbiddenErr('Запрещено, нет прав доступа к содержимому!');
  }
  req.user = payload;
  next();
};

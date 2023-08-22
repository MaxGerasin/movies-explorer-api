const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/conflictError');
const IncorrectError = require('../errors/incorrectError');
const NotFoundDataError = require('../errors/notFoundDataError');
const UnauthorizedError = require('../errors/unauthorizedError');
const { errorMessages } = require('../const');
const { DEV_JWT_SECRET } = require('../config');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundDataError(errorMessages.NOT_FOUND_DATA);
      }
    })
    .catch(next);
};

const postUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => {
      const { ...userCurr } = user.toObject();
      delete userCurr.password;
      res.send(userCurr);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectError(errorMessages.INCORRECT_DATA));
      } else if (err.code === 11000) {
        next(new ConflictError(errorMessages.CONFLICT));
      } else {
        next(err);
      }
    });
};

const patchUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectError(errorMessages.INCORRECT_DATA));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundDataError(errorMessages.NOT_FOUND_DATA));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET, {
        expiresIn: '7d',
      });
      res.cookie('jwt', token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ message: 'Авторизация прошла успешно' });
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Вы вышли из своего аккаунта' });
};

module.exports = {
  getUser,
  patchUser,
  postUser,
  login,
  logout,
};

const mongoose = require('mongoose');
const Movie = require('../models/movie');
const ForbiddenError = require('../errors/forbiddenError');
const IncorrectError = require('../errors/incorrectError');
const NotFoundDataError = require('../errors/notFoundDataError');
const { errorMessages } = require('../const');

const getMovies = async (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectError(errorMessages.INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.params._id, owner: req.user._id })
    .then((movie) => {
      if (movie) {
        const owner = movie.owner.toString();
        if (owner !== req.user._id) {
          throw new ForbiddenError(errorMessages.FORBIDDEN);
        } else {
          return Movie.findOneAndRemove({ movieId: req.params._id });
        }
      } else {
        throw new NotFoundDataError(errorMessages.NOT_FOUND_DATA);
      }
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new IncorrectError(errorMessages.INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};

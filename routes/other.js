const router = require('express').Router();
const { errorMessages } = require('../const');
const NotFoundDataError = require('../errors/notFoundDataError');

router.use('*', (req, res, next) => {
  next(new NotFoundDataError(errorMessages.WRONG_PATH));
});

module.exports = router;

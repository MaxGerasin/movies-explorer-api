const { codesError, errorMessages } = require('../const');

const errors = (err, req, res, next) => {
  const { statusCode = codesError.DEFAULT, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? errorMessages.DEFAULT : message,
  });
  next();
};

module.exports = errors;

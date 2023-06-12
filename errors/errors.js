const InternalServerError = require('./InternalServerError');
const NotFoundError = require('./NotFoundError');
const ForbidenError = require('./ForbiddenError');
const BadRequestError = require('./BadRequestError');
const UnathorizedError = require('./UnauthorizedError');
const ConflictError = require('./ConflictError');

module.exports = {
  InternalServerError,
  NotFoundError,
  ForbidenError,
  BadRequestError,
  UnathorizedError,
  ConflictError,
};

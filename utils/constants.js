const defaultImageLink = /^https?:\/\/(?:[a-z0-9\\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpe?g|gif|png|bmp|webp)$/im;
const NotFoundError = 404;
const ServerError = 500;
const BadRequestError = 400;
const Ok = 201;

module.exports = {
  defaultImageLink,
  NotFoundError,
  BadRequestError,
  ServerError,
  Ok,
};

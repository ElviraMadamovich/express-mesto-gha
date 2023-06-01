const defaultImageLink = /^https?:\/\/(?:[a-z0-9\\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpe?g|gif|png|bmp|webp)$/im;
const NotFound = 404;
const ServerError = 500;
const BadRequest = 400;
const Ok = 200;
const Success = 201;

module.exports = {
  defaultImageLink,
  NotFound,
  BadRequest,
  ServerError,
  Ok,
  Success,
};

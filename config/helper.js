const AppError = require("./appError");
const _ = require("underscore");

exports.validateParams = (req, next, request) => {
  request.map((item) => {
    if (!req.body[item]) return next(new AppError(`${item} is required`, 400));
  });
  let data = _.pick(req.body, request);
  return data;
};

const _ = require("underscore");

// Validate the parameters passed into the request.body
exports.validateParams = (req, next, request) => {
  request.map((item) => {
    if (!req.body[item]) return next(new Error(`${item} is required`, 400));
    // if (typeof req.body[item] === "string") {
    //   req.body[item] = req.body[item].toLowerCase();
    // }
  });
  // Filter the data in req.body to include only the items that are in the request
  let data = _.pick(req.body, request);
  return data;
};

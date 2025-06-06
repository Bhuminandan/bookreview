const { errorResponse } = require('../utils/responseHandler');

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return errorResponse(res, message, status);
};

module.exports = errorHandler;

exports.successResponse = (res, data, status = 200) => {
  return res.status(status).json({
    data,
    isSuccess: true,
    status,
  });
};

exports.errorResponse = (res, message, status = 500) => {
  return res.status(status).json({
    message,
    isSuccess: false,
    status,
  });
};

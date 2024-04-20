export default (error, req, res, next) => {
  res.status(error.status ?? 500).json({
    code: error.status ?? 500,
    message: error.message,
    // stack: error.stack,
    data: error.data,
  });
};

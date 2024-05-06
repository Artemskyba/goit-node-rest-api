export default (error, req, res, next) => {
  res.status(error.status ?? 500).json({
    message: error.message,
    // stack: error.stack,
  });
};

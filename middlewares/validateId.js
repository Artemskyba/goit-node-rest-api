const { isValidObjectId } = require("mongoose");

module.exports = (req, res, next) => {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    res.status(400).json({
      code: 400,
      message: `ID ${id} is invalid, please check ID`,
    });
  }
  next();
};

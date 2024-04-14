const asyncHandler = require("express-async-handler");
const { isValidObjectId } = require("mongoose");
const {
  getOneById,
  createNew,
  updateData,
} = require("../services/contactsServices");

const validateUserId = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    res.status(400).json({
      code: 400,
      message: `User with ID ${id} not found...`,
    });

  const contact = await getOneById(id);
  if (!contact)
    res.status(400).json({
      code: 400,
      message: `User with ID ${id} not found...`,
    });
  req.contact = contact;
  next();
});

const joiValidateDataMiddleware = (JoiSchema) => {
  return (req, res, next) => {
    const { error } = JoiSchema.validate(req.body);
    if (error) {
      const message = `Joi validator: ${error.details[0].message}`;
      res.status(400).json({
        code: 400,
        message,
      });
    }
    next();
  };
};

const validateCreateDataMiddleware = asyncHandler(async (req, res, next) => {
  const { name, favorite } = req.body;
  if (!name || !favorite) {
    res.status(400);
    throw new Error("Please provide all required fields (name and favorite");
  }

  const newContact = await createNew(req.body);
  req.contact = newContact;
  next();
});

const updateContactMiddleware = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
    body,
  } = req;

  const updatedContact = await updateData(id, body);
  req.contact = updatedContact;
  next();
});

module.exports = {
  validateUserId,
  joiValidateDataMiddleware,
  validateCreateDataMiddleware,
  updateContactMiddleware,
};

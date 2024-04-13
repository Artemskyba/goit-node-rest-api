const { isValidObjectId } = require("mongoose");
const {
  getOneById,
  createNew,
  update,
} = require("../services/contactsServices");

const validateUserId = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

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

const validateCreateDataMiddleware = async (req, res, next) => {
  try {
    const { name, favorite } = req.body;
    if (!name || !favorite) {
      res.status(400);
      throw new Error("Please provide all required fields (name and favorite");
    }
    const newContact = await createNew(req.body);
    req.contact = newContact;
    next();
  } catch (error) {
    next(error);
  }
};

const updateContactMiddleware = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updatedContact = await update(id, body);
    req.contact = updatedContact;
    next();
  } catch (error) {
    next(error);
  }
};

const updateFavoriteMiddleware = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updatedContact = await update(id, body);
    req.contact = updatedContact;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateUserId,
  joiValidateDataMiddleware,
  validateCreateDataMiddleware,
  updateContactMiddleware,
  updateFavoriteMiddleware,
};

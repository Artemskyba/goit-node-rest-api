const {
  listContacts,
  getOneContactById,
  removeContact,
  addContact,
  updateContactById,
} = require("../services/contactsServices");

const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas");

const HttpError = require("../helpers/HttpError");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async ({ params }, res) => {
  try {
    const result = await getOneContactById(params.id);
    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async ({ params }, res) => {
  try {
    const result = await removeContact(params.id);
    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async ({ body }, res, next) => {
  try {
    const { error } = createContactSchema.validate(body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await addContact(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async ({ params, body }, res, next) => {
  try {
    if (Object.keys(body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }

    const { error } = updateContactSchema.validate(body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await updateContactById(params.id, body);
    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
};

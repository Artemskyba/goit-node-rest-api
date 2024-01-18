const contactsService = require("../services/contactsServices");
const handleNotFound = (res) => {
  res.status(404).json({ message: "Not found" });
};
const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const result = await contactsService.getContactById(req.params.id);
  if (result) {
    res.status(200).json(result);
  } else {
    handleNotFound(res);
  }
};

const deleteContact = async (req, res) => {
  const result = await contactsService.removeContact(req.params.id);
  if (result) {
    res.status(200).json(result);
  } else {
    handleNotFound(res);
  }
};

const createContact = (req, res) => {};

const updateContact = (req, res) => {};

module.exports = {
  getAllContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
};
// add try catch!!!!

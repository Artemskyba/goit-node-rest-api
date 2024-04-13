const asyncHandler = require("express-async-handler");
const {
  getContactListService,
  deleteById,
} = require("../services/contactsServices");

const getContactsList = asyncHandler(async (req, res) => {
  const contacts = await getContactListService();

  res.status(200).json({
    code: 200,
    quantity: contacts.length,
    message: "sucsess",
    data: contacts,
  });
});

const getContactById = asyncHandler(async (req, res) => {
  const { contact } = req;
  res.status(200).json({
    code: 200,
    message: "sucsess",
    data: contact,
  });
});

const deleteContact = asyncHandler(async (req, res) => {
  const deletedContact = await deleteById(req.contact.id);

  res.status(200).json({
    code: 200,
    message: "sucsess",
    data: deletedContact,
  });
});

const createContact = asyncHandler(async (req, res) => {
  const { contact } = req;
  res.status(201).json({
    code: 201,
    message: "created",
    data: contact,
  });
});

const updateContact = asyncHandler(async (req, res) => {
  const { contact } = req;
  res.status(200).json({
    code: 200,
    message: "sucsess",
    data: contact,
  });
});

const updateStatusContact = asyncHandler(async (req, res) => {
  const { contact } = req;
  res.status(200).json({
    code: 200,
    message: "sucsess",
    data: contact,
  });
});

module.exports = {
  getContactsList,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
};

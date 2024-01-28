const asyncHandler = require("express-async-handler");
const ContactModel = require("../models/Contact");

class ContactsController {
  getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await ContactModel.find({});
    res.status(200).json({
      code: 200,
      quantity: contacts.length,
      message: "sucsess",
      data: contacts,
    });
  });

  getContactById = asyncHandler(async (req, res) => {
    const contactId = req.params.id;
    const contact = await ContactModel.findById(contactId);

    if (!contact) {
      res.status(404).json({
        code: 404,
        message: `Contact with ID ${contactId} not found :( `,
      });
    }

    res.status(200).json({
      code: 200,
      message: "sucsess",
      data: contact,
    });
  });

  deleteContact = asyncHandler(async (req, res) => {
    const contactId = req.params.id;
    const contact = await ContactModel.findByIdAndDelete(contactId);

    if (!contact) {
      res.status(404).json({
        code: 404,
        message: `Contact with ID ${contactId} not found :( `,
      });
    }

    res.status(200).json({
      code: 200,
      message: "sucsess",
      data: contact,
    });
  });

  createContact = asyncHandler(async (req, res) => {
    const { name, favorite } = req.body;

    if (!name || !favorite) {
      res.status(400);
      throw new Error("Please provide all required fields (name and favorite");
    }

    const contact = await ContactModel.create({ ...req.body });
    res.status(201).json({
      code: 201,
      message: "sucsess",
      data: contact,
    });
  });

  updateContact = asyncHandler(async (req, res) => {
    const contactId = req.params.id;
    const contact = await ContactModel.findByIdAndUpdate(
      contactId,
      { ...req.body },
      { runValidators: true, new: true }
    );

    if (!contact) {
      res.status(404).json({
        code: 404,
        message: `Contact with ID ${contactId} not found :( `,
      });
    }

    res.status(200).json({
      code: 200,
      message: "sucsess",
      data: contact,
    });
  });

  updateStatusContact = asyncHandler(async (req, res) => {
    const contactId = req.params.id;
    const contact = await ContactModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { runValidators: true, new: true }
    );

    if (!contact) {
      res.status(404).json({
        code: 404,
        message: `Contact with ID ${contactId} not found :( `,
      });
    }

    res.status(200).json({
      code: 200,
      message: "sucsess",
      data: contact,
    });
  });
}

module.exports = new ContactsController();

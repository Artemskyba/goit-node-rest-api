import asyncHandler from "express-async-handler";
import {
  getContactListService,
  deleteById,
} from "../services/contactsServices.js";

export const getContactsList = asyncHandler(async (req, res) => {
  const contacts = await getContactListService();

  res.status(200).json({
    code: 200,
    quantity: contacts.length,
    message: "sucsess",
    contacts,
  });
});

export const getContactById = asyncHandler(async (req, res) => {
  const { contact } = req;
  res.status(200).json({
    code: 200,
    message: "sucsess",
    contact,
  });
});

export const deleteContact = asyncHandler(async (req, res) => {
  const deletedContact = await deleteById(req.contact.id);

  res.status(200).json({
    code: 200,
    message: "sucsess",
    data: deletedContact,
  });
});

export const createContact = asyncHandler(async (req, res) => {
  const { contact } = req;
  res.status(201).json({
    code: 201,
    message: "created",
    contact,
  });
});

export const updateContact = asyncHandler(async (req, res) => {
  const { contact } = req;
  res.status(200).json({
    code: 200,
    message: "sucsess",
    contact,
  });
});

export const updateStatusContact = asyncHandler(async (req, res) => {
  const { contact } = req;
  res.status(200).json({
    code: 200,
    message: "sucsess",
    contact,
  });
});

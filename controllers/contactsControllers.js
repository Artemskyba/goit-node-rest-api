import expressAsyncHandler from "express-async-handler";
import {
  getContactListService,
  deleteById,
} from "../services/contactsServices.js";

export const getContactsList = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  const contacts = await getContactListService({ owner: id });
  res.status(200).json(contacts);
});

export const getContactById = expressAsyncHandler(async (req, res) => {
  const { contact } = req;
  res.status(200).json(contact);
});

export const deleteContact = expressAsyncHandler(async (req, res) => {
  const deletedContact = await deleteById(req.contact.id);

  res.status(200).json(deletedContact);
});

export const createContact = expressAsyncHandler(async (req, res) => {
  const { contact } = req;
  res.status(201).json(contact);
});

export const updateContact = expressAsyncHandler(async (req, res) => {
  const { contact } = req;
  res.status(200).json(contact);
});

export const updateStatusContact = expressAsyncHandler(async (req, res) => {
  const { contact } = req;
  res.status(200).json(contact);
});

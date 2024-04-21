import ContactModel from "../models/Contact.js";

export const getContactListService = (id) => ContactModel.find(id);

export const getOneById = async (id) => await ContactModel.findById(id);

export const deleteById = async (id) =>
  await ContactModel.findByIdAndDelete(id);

export const createNew = async (data, ownerId) =>
  await ContactModel.create({ ...data, owner: ownerId });

export const checkContactExistsService = (filter) =>
  ContactModel.exists(filter);

export const updateData = async (id, data) =>
  await ContactModel.findByIdAndUpdate(
    id,
    { ...data },
    { runValidators: true, new: true }
  );

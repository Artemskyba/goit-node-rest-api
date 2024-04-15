import ContactModel from "../models/Contact.js";

export const getContactListService = () => ContactModel.find();

export const getOneById = async (id) => await ContactModel.findById(id);

export const deleteById = async (id) =>
  await ContactModel.findByIdAndDelete(id);

export const createNew = async (data) => await ContactModel.create({ ...data });

export const updateData = async (id, data) =>
  await ContactModel.findByIdAndUpdate(
    id,
    { ...data },
    { runValidators: true, new: true }
  );

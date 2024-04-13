const ContactModel = require("../models/Contact");

const getContactListService = () => ContactModel.find();

const getOneById = async (id) => await ContactModel.findById(id);

const deleteById = async (id) => await ContactModel.findByIdAndDelete(id);

const createNew = async (data) => await ContactModel.create({ ...data });

const update = async (id, data) =>
  await ContactModel.findByIdAndUpdate(
    id,
    { ...data },
    { runValidators: true, new: true }
  );

const updateFavorite = async (id, data) =>
  await ContactModel.findByIdAndUpdate(
    id,
    { ...data },
    { runValidators: true, new: true }
  );

module.exports = {
  getContactListService,
  getOneById,
  deleteById,
  createNew,
  update,
  updateFavorite,
};

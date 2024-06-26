import expressAsyncHandler from "express-async-handler";
import { isValidObjectId } from "mongoose";
import {
  getOneById,
  createNew,
  updateData,
  checkContactExistsService,
} from "../services/contactsServices.js";
import { HttpError } from "../utils/httpError.js";

export const validateContactId = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id))
    throw new HttpError(400, `Contact with ID ${id} not found...`);

  const contact = await getOneById(id);
  if (!contact) throw new HttpError(400, `Contact with ID ${id} not found...`);
  req.contact = contact;
  next();
});

export const validateOwner = (req, res, next) => {
  if (req.user.id !== req.contact.owner.toString())
    throw new HttpError(401, "Not authorized");
  next();
};

export const validateCreateDataMiddleware = expressAsyncHandler(
  async (req, res, next) => {
    const { name, email } = req.body;
    if (!name) throw new HttpError(400, "Name is required)");

    const isContactExist = await checkContactExistsService({ email: email });
    if (isContactExist) throw new HttpError(409, `Email in use`);

    const newContact = await createNew(req.body, req.user.id);
    req.contact = newContact;
    next();
  }
);

export const updateContactMiddleware = expressAsyncHandler(
  async (req, res, next) => {
    const {
      params: { id },
      body,
    } = req;

    const updatedContact = await updateData(id, body);
    req.contact = updatedContact;
    next();
  }
);

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

export const validateCreateDataMiddleware = expressAsyncHandler(
  async (req, res, next) => {
    const { name, favorite, email } = req.body;
    if (!name || !favorite)
      throw new HttpError(
        400,
        "Please provide all required fields (name and favorite)"
      );

    const isContactExist = await checkContactExistsService({ email: email });
    if (isContactExist) throw new HttpError(409, `Email in use`);

    const newContact = await createNew(req.body);
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

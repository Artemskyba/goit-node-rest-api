import { Router } from "express";
import {
  validateContactId,
  validateCreateDataMiddleware,
  updateContactMiddleware,
  validateOwner,
} from "../middlewares/contactMidlewares.js";

import {
  contactJoiSchema,
  updateJoiSchema,
  updateStatusJoiSchema,
} from "../schemas/contactsJoiSchema.js";

import {
  getContactsList,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";

import { joiValidateDataMiddleware } from "../middlewares/joiValidateMiddleware.js";
import { protection } from "../middlewares/userMiddlewares.js";

const router = Router();

router.use("/", protection);

router
  .route("/")
  .get(getContactsList)
  .post(
    joiValidateDataMiddleware(contactJoiSchema),
    validateCreateDataMiddleware,
    createContact
  );

router.use("/:id", validateContactId, validateOwner);

router
  .route("/:id")
  .get(getContactById)
  .delete(deleteContact)
  .patch(
    joiValidateDataMiddleware(updateJoiSchema),
    updateContactMiddleware,
    updateContact
  );

router
  .route("/:id/favorite")
  .patch(
    joiValidateDataMiddleware(updateStatusJoiSchema),
    updateContactMiddleware,
    updateStatusContact
  );

export default router;

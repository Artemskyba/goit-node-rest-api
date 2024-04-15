import { Router } from "express";
import {
  validateUserId,
  joiValidateDataMiddleware,
  validateCreateDataMiddleware,
  updateContactMiddleware,
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

const router = Router();

router
  .route("/")
  .get(getContactsList)
  .post(
    joiValidateDataMiddleware(contactJoiSchema),
    validateCreateDataMiddleware,
    createContact
  );

router.use("/:id", validateUserId);

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

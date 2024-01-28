const contactsRouter = require("express").Router();
const validateContactMiddleware = require("../middlewares/validateContactMiddleware.js");
const Contacts = require("../controllers/contactsControllers.js");
const validateId = require("../middlewares/validateId");
const {
  contactJoiSchema,
  updateJoiSchema,
  updateStatusJoiSchema,
} = require("../schemas/contactsJoiSchema.js");

contactsRouter.get("/", Contacts.getAllContacts);

contactsRouter.get("/:id", validateId, Contacts.getContactById);

contactsRouter.delete("/:id", validateId, Contacts.deleteContact);

contactsRouter.post(
  "/",
  validateContactMiddleware(contactJoiSchema),
  Contacts.createContact
);

contactsRouter.patch(
  "/:id",
  validateId,
  validateContactMiddleware(updateJoiSchema),
  Contacts.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  validateId,
  validateContactMiddleware(updateStatusJoiSchema),
  Contacts.updateStatusContact
);

module.exports = contactsRouter;

const { Router } = require("express");
const {
  validateUserId,
  joiValidateDataMiddleware,
  validateCreateDataMiddleware,
  updateContactMiddleware,
} = require("../middlewares/contactMidlewares.js");

const {
  contactJoiSchema,
  updateJoiSchema,
  updateStatusJoiSchema,
} = require("../schemas/contactsJoiSchema.js");

const {
  getContactsList,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} = require("../controllers/contactsControllers.js");

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

module.exports = router;

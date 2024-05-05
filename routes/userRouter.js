import { Router } from "express";
import { joiValidateDataMiddleware } from "../middlewares/joiValidateMiddleware.js";
import {
  emailJoiSchema,
  loginJoiSchema,
  registerJoiSchema,
} from "../schemas/userJoiSchema.js";

import {
  getCurrent,
  loginUser,
  logout,
  registerUser,
  resendingEmail,
  updateAvatar,
  verification,
} from "../controllers/userControllers.js";

import {
  checkExistFile,
  checkRequiredEmail,
  protection,
  uploadAvatar,
} from "../middlewares/userMiddlewares.js";

const router = Router();

router.post(
  "/register",
  joiValidateDataMiddleware(registerJoiSchema),
  registerUser
);

router.get("/verify/:verificationToken", verification);

router.post(
  "/verify",
  joiValidateDataMiddleware(emailJoiSchema),
  checkRequiredEmail,
  resendingEmail
);

router.post("/login", joiValidateDataMiddleware(loginJoiSchema), loginUser);

router.post("/logout", protection, logout);

router.get("/current", protection, getCurrent);

router.patch(
  "/avatars",
  protection,
  uploadAvatar,
  checkExistFile,
  updateAvatar
);

export default router;

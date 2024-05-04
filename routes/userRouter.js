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
  loginCheckData,
  logoutMiddleware,
  protection,
  registerCheckData,
  resendingEmailMiddleware,
  updateAvatarMiddleware,
  uploadAvatar,
  verificationMiddleware,
} from "../middlewares/userMiddlewares.js";

const router = Router();

router.post(
  "/register",
  joiValidateDataMiddleware(registerJoiSchema),
  registerCheckData,
  registerUser
);

router.get("/verify/:verificationToken", verificationMiddleware, verification);

router.post(
  "/verify",
  joiValidateDataMiddleware(emailJoiSchema),
  resendingEmailMiddleware,
  resendingEmail
);

router.post(
  "/login",
  joiValidateDataMiddleware(loginJoiSchema),
  loginCheckData,
  loginUser
);

router.post("/logout", protection, logoutMiddleware, logout);

router.get("/current", protection, getCurrent);

router.patch(
  "/avatars",
  protection,
  uploadAvatar,
  updateAvatarMiddleware,
  updateAvatar
);

export default router;

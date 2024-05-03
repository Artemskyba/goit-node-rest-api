import { Router } from "express";
import { joiValidateDataMiddleware } from "../middlewares/joiValidateMiddleware.js";
import { loginJoiSchema, registerJoiSchema } from "../schemas/userJoiSchema.js";

import {
  getCurrent,
  loginUser,
  logout,
  registerUser,
  updateAvatar,
} from "../controllers/userControllers.js";

import {
  loginCheckData,
  logoutMiddleware,
  protection,
  registerCheckData,
  updateAvatarMiddleware,
  uploadAvatar,
} from "../middlewares/userMiddlewares.js";

const router = Router();

router.post(
  "/register",
  joiValidateDataMiddleware(registerJoiSchema),
  registerCheckData,
  registerUser
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

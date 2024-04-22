import { Router } from "express";
import { joiValidateDataMiddleware } from "../middlewares/joiValidateMiddleware.js";
import { loginJoiSchema, registerJoiSchema } from "../schemas/userJoiSchema.js";

import {
  getCurrent,
  loginUser,
  logout,
  registerUser,
} from "../controllers/userControllers.js";

import {
  loginCheckData,
  logoutMiddleware,
  protection,
  registerCheckData,
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

export default router;

import expressAsyncHandler from "express-async-handler";
import { findUserService } from "../services/userServices.js";
import { HttpError } from "../utils/httpError.js";
import { tokenValidation } from "../services/jwtService.js";
import multer from "multer";
import { multerFilter, multerStogage } from "../services/multerService.js";

export const checkRequiredEmail = expressAsyncHandler(
  async (req, res, next) => {
    const { email } = req.body;
    if (!email) throw new HttpError(400, "Missing required field email");

    next();
  }
);

export const protection = expressAsyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) throw new HttpError(401, "Not authorized");

  const token = authorization.split(" ")[1];
  const userId = tokenValidation(token);
  if (!userId) throw new HttpError(401, "Not authorized");

  const user = await findUserService(userId, token);
  req.user = user;
  next();
});

export const uploadAvatar = multer({
  storage: multerStogage,
  filter: multerFilter,
  limits: {
    fieldSize: 3 * 1024 * 1024,
  },
}).single("avatar");

export const checkExistFile = expressAsyncHandler(async (req, res, next) => {
  const { file } = req;

  if (!file) throw new HttpError(400, "Please upload image");

  next();
});

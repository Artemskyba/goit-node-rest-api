import expressAsyncHandler from "express-async-handler";
import gravatar from "gravatar";
import {
  checkUserExistsService,
  findUserService,
  loginService,
  logoutService,
  updateAvatarService,
} from "../services/userServices.js";
import { hashPassword, registerUserService } from "../services/userServices.js";
import { HttpError } from "../utils/httpError.js";
import { tokenValidation } from "../services/jwtService.js";
import multer from "multer";
import { multerFilter, multerStogage } from "../services/multerService.js";

export const registerCheckData = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new HttpError(
      400,
      "Please provide all required fields (email and password)"
    );

  const isUserExist = await checkUserExistsService({ email: email });
  if (isUserExist) throw new HttpError(409, `Email in use`);

  const hash = await hashPassword(password);
  req.body.password = hash;

  const avatar = gravatar.url(email, {
    d: "monsterid",
  });

  req.body.avatarURL = avatar;

  const newUser = await registerUserService(req.body);
  if (!newUser) throw new HttpError(500, "Something went wrong");

  newUser.password = undefined;
  req.user = newUser;
  next();
});

export const loginCheckData = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await loginService({ email: email }, password);

  req.user = user;
  next();
});

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

export const logoutMiddleware = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.user;
  req.user = await logoutService(id);
  next();
});

export const uploadAvatar = multer({
  storage: multerStogage,
  filter: multerFilter,
  limits: {
    fieldSize: 3 * 1024 * 1024,
  },
}).single("avatar");

export const updateAvatarMiddleware = expressAsyncHandler(
  async (req, res, next) => {
    const { user, file } = req;

    if (!file) throw new HttpError(400, "Please upload image");

    const userWithUpdatedAvatar = await updateAvatarService(user, file);
    req.user = userWithUpdatedAvatar;
    next();
  }
);

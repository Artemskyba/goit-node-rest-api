import expressAsyncHandler from "express-async-handler";
import gravatar from "gravatar";
import { v4 } from "uuid";
import {
  checkResendingEmailDataService,
  checkUserExistsService,
  findUserService,
  loginService,
  logoutService,
  updateAvatarService,
  verificationService,
} from "../services/userServices.js";
import { hashPassword, registerUserService } from "../services/userServices.js";
import { HttpError } from "../utils/httpError.js";
import { tokenValidation } from "../services/jwtService.js";
import multer from "multer";
import { multerFilter, multerStogage } from "../services/multerService.js";
import { nodemailerService } from "../services/nodemailerService.js";

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

  const verificationToken = v4();

  const sendedEmail = await nodemailerService(verificationToken, email);
  if (!sendedEmail) throw new HttpError(500, "Oops, something went wrong :(");

  req.body.verificationToken = verificationToken;

  const newUser = await registerUserService(req.body);
  if (!newUser) throw new HttpError(500, "Something went wrong");

  req.user = newUser;
  next();
});

export const verificationMiddleware = expressAsyncHandler(
  async (req, res, next) => {
    const { verificationToken } = req.params;
    await verificationService({ verificationToken: verificationToken });
    next();
  }
);

export const resendingEmailMiddleware = expressAsyncHandler(
  async (req, res, next) => {
    const { email } = req.body;

    if (!email) throw new HttpError(400, "Missing required field email");

    const verificationToken = await checkResendingEmailDataService({
      email: email,
    });

    const sendedEmail = await nodemailerService(verificationToken, email);
    if (!sendedEmail) throw new HttpError(500, "Oops, something went wrong :(");
    next();
  }
);

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

import "dotenv/config";
import { User } from "../models/User.js";
const { GEN_SALT_NUMBER } = process.env;
import bcrypt from "bcrypt";
import { createToken } from "./jwtService.js";
import { HttpError } from "../utils/httpError.js";
import expressAsyncHandler from "express-async-handler";
import { jimpService } from "./jimpService.js";
import gravatar from "gravatar";
import { v4 } from "uuid";
import { nodemailerService } from "./nodemailerService.js";

export const registerUserService = async (body) => {
  const { email, password } = body;

  if (!email || !password)
    throw new HttpError(
      400,
      "Please provide all required fields (email and password)"
    );

  const isUserExist = await checkUserExistsService({ email: email });
  if (isUserExist) throw new HttpError(409, `Email in use`);

  const hash = await hashPassword(password);
  body.password = hash;

  const avatar = gravatar.url(email, {
    d: "monsterid",
  });
  body.avatarURL = avatar;

  const verificationToken = v4();

  const sendedEmail = await nodemailerService(verificationToken, email);
  if (!sendedEmail) throw new HttpError(500, "Oops, something went wrong :(");

  body.verificationToken = verificationToken;

  const user = await createUserService(body);
  if (!user) throw new HttpError(500, "Something went wrong");

  return user;
};

export const checkUserExistsService = async (filter) =>
  await User.exists(filter);

export const hashPassword = async (data) => {
  const salt = await bcrypt.genSalt(+GEN_SALT_NUMBER);
  const hash = bcrypt.hash(data, salt);
  return hash;
};

export const createUserService = async (data) => {
  const user = await User.create(data);
  const { email, subscription, avatarURL } = user;
  return { email, subscription, avatarURL };
};

export const verificationService = async (verificationToken) => {
  const user = await User.findOneAndUpdate(verificationToken, {
    verificationToken: null,
    verify: true,
  });

  if (!user) throw new HttpError(404, "User not found");
};

export const resendingEmailService = async (filter) => {
  const user = await User.findOne(filter);

  if (!user) throw new HttpError(404, "User not found ");

  if (user.verify === true)
    throw new HttpError(400, "Verification has already been passed");

  const { verificationToken, email } = user;

  const sendedEmail = await nodemailerService(verificationToken, email);
  if (!sendedEmail) throw new HttpError(500, "Oops, something went wrong :(");
};

export const loginService = async (email, password) => {
  const user = await User.findOne(email);
  if (!user) throw new HttpError(401, "Email or password is wrong");

  if (user.verify !== true)
    throw new HttpError(401, "Please, verificate your email");

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new HttpError(401, "Email or password is wrong");

  const token = createToken(user.id);
  const newUser = await User.findOneAndUpdate(
    email,
    { token: token },
    { new: true }
  ).select("-_id -token -password -avatarURL -verify -verificationToken");
  return {
    token,
    user: newUser,
  };
};

export const findUserService = expressAsyncHandler(async (id, token) => {
  const user = await User.findById(id);
  if (!user) throw new HttpError(401, "Not authorized");

  if (user.token !== token) throw new HttpError(401, "Not authorized");
  user.password = undefined;
  return user;
});

export const logoutService = expressAsyncHandler(async (id) => {
  const newUser = await User.findByIdAndUpdate(
    id,
    { token: null },
    { new: true }
  );
  return newUser;
});

export const updateAvatarService = expressAsyncHandler(async (user, file) => {
  if (file) {
    user.avatarURL = file.path.replace("public", "");
  }

  const newAvatarURL = await jimpService(user);

  await User.findByIdAndUpdate(
    user.id,
    { avatarURL: newAvatarURL },
    { runValidators: true, new: true }
  );

  return newAvatarURL;
});

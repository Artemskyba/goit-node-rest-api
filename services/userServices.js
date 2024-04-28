import { User } from "../models/User.js";
import "dotenv/config";
const { GEN_SALT_NUMBER } = process.env;
import bcrypt from "bcrypt";
import { createToken } from "./jwtService.js";
import { HttpError } from "../utils/httpError.js";
import expressAsyncHandler from "express-async-handler";
import { jimpService } from "./jimpService.js";

export const checkUserExistsService = async (filter) =>
  await User.exists(filter);

export const registerUserService = async (data) => {
  const user = await User.create(data);
  const { _id, token, ...anyUserData } = user.toObject();
  return anyUserData;
};

export const hashPassword = async (data) => {
  const salt = await bcrypt.genSalt(+GEN_SALT_NUMBER);
  const hash = bcrypt.hash(data, salt);
  return hash;
};

export const loginService = async (email, password) => {
  const user = await User.findOne(email);
  if (!user) throw new HttpError(401, "Email or password is wrong");

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new HttpError(401, "Email or password is wrong");

  const token = createToken(user.id);
  const newUser = await User.findOneAndUpdate(
    email,
    { token: token },
    { new: true }
  ).select("-_id -token -password");
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
  user.avatarURL = newAvatarURL;

  const userWithUpdatedAvatar = await User.findByIdAndUpdate(
    user.id,
    { ...user },
    { runValidators: true, new: true }
  );
  return userWithUpdatedAvatar;
});

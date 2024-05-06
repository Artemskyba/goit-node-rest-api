import expressAsyncHandler from "express-async-handler";
import {
  loginService,
  logoutService,
  registerUserService,
  resendingEmailService,
  updateAvatarService,
  verificationService,
} from "../services/userServices.js";

export const registerUser = expressAsyncHandler(async (req, res) => {
  const user = await registerUserService(req.body);

  res.status(201).json({
    user,
  });
});

export const verification = expressAsyncHandler(async (req, res) => {
  const { verificationToken } = req.params;
  await verificationService({ verificationToken: verificationToken });

  res.status(200).json({
    message: "Verification sucsessful",
  });
});

export const resendingEmail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  await resendingEmailService({ email: email });

  res.status(200).json({
    message: "Verification email sent",
  });
});

export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginService({ email: email }, password);

  res.status(200).json({
    token,
    user,
  });
});

export const logout = expressAsyncHandler(async (req, res) => {
  const { id } = req.user;
  await logoutService(id);

  res.sendStatus(204);
});

export const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

export const updateAvatar = expressAsyncHandler(async (req, res) => {
  const { user, file } = req;
  const avatarURL = await updateAvatarService(user, file);

  res.status(400).json({ avatarURL });
});

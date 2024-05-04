import expressAsyncHandler from "express-async-handler";

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { user } = req;
  res.status(201).json({
    user,
  });
});

export const verification = expressAsyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Verification sucsessful",
  });
});

export const resendingEmail = expressAsyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Verification email sent",
  });
});

export const loginUser = expressAsyncHandler(async (req, res) => {
  const { token, user } = req.user;

  res.status(200).json({
    token,
    user,
  });
});

export const logout = expressAsyncHandler(async (req, res) => {
  res.sendStatus(204);
});

export const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    email,
    subscription,
  });
};

export const updateAvatar = (req, res) => {
  res.status(400).json({ avatarURL: req.user.avatarURL });
};

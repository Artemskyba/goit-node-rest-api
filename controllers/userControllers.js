import expressAsyncHandler from "express-async-handler";

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { user } = req;
  res.status(201).json({
    code: 201,
    message: "Created",
    user,
  });
});

export const loginUser = expressAsyncHandler(async (req, res) => {
  const { token, user } = req.user;

  res.status(200).json({
    code: 200,
    message: "Sucsess",
    token,
    user,
  });
});

export const logout = expressAsyncHandler(async (req, res) => {
  res.sendStatus(204);
});

export const getCurrent = (req, res) => {
  const { _id, token, ...anyUserData } = req.user.toObject();

  res.status(200).json({
    code: 200,
    user: anyUserData,
  });
};

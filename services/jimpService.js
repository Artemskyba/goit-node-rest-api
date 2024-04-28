import Jimp from "jimp";
import { v4 } from "uuid";
import path from "path";
import expressAsyncHandler from "express-async-handler";
import fs from "fs/promises";

export const jimpService = expressAsyncHandler(async (user) => {
  const extention = user.avatarURL.split(".")[1];

  const fileName = `${user.id}-${v4()}.${extention}`;
  const filePath = path.join(process.cwd(), "public", "avatars");

  Jimp.read(user.avatarURL, (err, avatar) => {
    avatar.resize(250, 250).write(path.join(filePath, fileName));
  });

  await fs.rm(user.avatarURL);

  return path.join("avatars", fileName);
});

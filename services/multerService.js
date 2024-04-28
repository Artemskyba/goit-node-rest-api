import multer from "multer";
import path from "path";

import { HttpError } from "../utils/httpError.js";

export const multerStogage = multer.diskStorage({
  destination: (req, file, cbk) => {
    cbk(null, path.join("tmp"));
  },

  filename: (req, file, cbk) => {
    const extention = file.mimetype.split("/")[1];
    cbk(null, `tmpAvatar.${extention}`);
  },
});

export const multerFilter = (req, file, cbk) => {
  if (file.mimetype.startsWith("image/")) {
    cbk(null, true);
  } else {
    cbk(new HttpError(400, "Please upload images only"), false);
  }
};

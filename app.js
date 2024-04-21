import "colors";
import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import contactRouter from "./routes/contactsRouter.js";
import userRouter from "./routes/userRouter.js";

import errorHandler from "./middlewares/errorHandler.js";
import routeNotFound from "./middlewares/routeNotFound.js";
import "dotenv/config";

const { PORT } = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/contacts", contactRouter);
app.use("/users", userRouter);

app.use("*", routeNotFound);

app.use(errorHandler);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.rainbow.italic.bold);
});

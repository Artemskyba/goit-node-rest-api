require("colors");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const contactsRouter = require("./routes/contactsRouter");
const errorHandler = require("./middlewares/errorHandler");
const routeNotFound = require("./middlewares/routeNotFound");

const configPath = path.join(__dirname, "config", ".env");
require("dotenv").config({ path: configPath });
const { PORT } = process.env;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/contacts", contactsRouter);

app.use("*", routeNotFound);

app.use(errorHandler);

connectDB();

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`.green.italic.bold);
});

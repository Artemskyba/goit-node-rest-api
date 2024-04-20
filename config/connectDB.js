import "dotenv/config";
const { MONGODB_URL, JWT_EXPRESS_IN } = process.env;
import { connect } from "mongoose";
import "colors";
const connectDB = async () => {
  try {
    const db = await connect(MONGODB_URL);
    console.log(
      `Database connection successful. NAME: ${db.connection.name}. HOST: ${db.connection.host} PORT: ${db.connection.port}`
        .green.italic.bold
    );
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(1);
  }
};

export default connectDB;

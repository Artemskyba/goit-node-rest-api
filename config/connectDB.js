const { connect } = require("mongoose");
require("colors");
const connectDB = async () => {
  try {
    const db = await connect(process.env.MONGODB_URL);
    console.log(
      `Database connection successful. NAME: ${db.connection.name}. HOST: ${db.connection.host} PORT: ${db.connection.port}`
        .green.italic.bold
    );
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;

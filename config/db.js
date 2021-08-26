//env
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = () => {
  //DB connect
  mongoose
    .connect(process.env.DB_CONN, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;

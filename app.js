//env
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 3000;

//import Routes
const authRoutes = require("./routes/auth");

//app
const app = express();

//Mongo Connect
connectDB();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes middleware
app.use("/api", authRoutes);

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

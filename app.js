const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
//env
require("dotenv").config();

const port = process.env.PORT || 3000;

//import Routes
const userRouter = require("./routes/user");

//app
const app = express();

//DB connect
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes middleware
app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
require("dotenv").config();

const port = process.env.PORT || 3000;

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

//Routes
app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

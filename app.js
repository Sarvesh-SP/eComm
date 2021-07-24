const express = require("express");

const port = process.env.PORT || 3000;
require("dotenv").config();

//import routes
const userRoutes = require("./routes/user");

const app = express();

// routes middleware
app.use(userRoutes);

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
/* 
role - Admin/user

*/
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    history: {
      type: Array,
      default: [],
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.methods = {
  authenticate: async (password, hash) => {
    try {
      const compare = await bcrypt.compare(password, hash);
      return compare;
    } catch (err) {
      return { err: "Error during hash_password check" };
    }
  },
};
module.exports = mongoose.model("User", userSchema);

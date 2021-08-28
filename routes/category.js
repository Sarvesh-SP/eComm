const express = require("express");
const router = express.Router();

const { checkSignin, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {
  create,
  catId,
  destroy,
  read,
  update,
  list,
} = require("../controllers/category");

router.post("/category/create/:userId", checkSignin, isAuth, isAdmin, create);
router.get("/category/:catId", read);
router.delete(
  "/category/delete/:userId/:catId",
  checkSignin,
  isAuth,
  isAdmin,
  destroy
);
router.put("/category/:catId/:userId", checkSignin, isAuth, isAdmin, update);

router.get("/categories", list);

router.param("catId", catId);
router.param("userId", userById);

module.exports = router;

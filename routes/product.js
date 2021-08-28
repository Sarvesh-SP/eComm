const express = require("express");
const router = express.Router();

const { checkSignin, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const {
  create,
  productId,
  fetch,
  destroy,
  update,
  list,
  related,
  listCategory,
} = require("../controllers/product");

router.post("/product/create/:userId", checkSignin, isAuth, isAdmin, create);
router.get("/product/:productId/:userId", checkSignin, isAuth, fetch);
router.delete(
  "/product/:productId/:userId",
  checkSignin,
  isAuth,
  isAdmin,
  destroy
);
router.put("/product/:productId/:userId", checkSignin, isAuth, isAdmin, update);

router.get("/products", list);
router.get("/products/related/:productId", related);
router.get("/products/categories", listCategory);
router.param("userId", userById);
router.param("productId", productId);
module.exports = router;

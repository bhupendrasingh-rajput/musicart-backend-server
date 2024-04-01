const express = require("express");
const router = express.Router();
const { getAllProducts, getProductById } = require("../Controllers/productController");

router.get("/get-all", getAllProducts);
router.get("/:productId", getProductById);

module.exports = router;
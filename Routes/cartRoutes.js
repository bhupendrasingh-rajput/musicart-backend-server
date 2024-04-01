const express = require("express");
const router = express.Router();
const { addProductToCart, getCartByUserId, updateCart, deleteCartByUserId } = require('../Controllers/cartController');
const verifyToken = require('../Middlewares/authMiddleware');

router.get('/get-cart', verifyToken, getCartByUserId);
router.post('/add-product', verifyToken, addProductToCart);
router.put('/update', verifyToken, updateCart);
router.delete('/delete', verifyToken, deleteCartByUserId);

module.exports = router;
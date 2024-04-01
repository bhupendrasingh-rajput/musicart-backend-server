const Cart = require('../Models/cartModel');

const calculateTotalPrice = (products) => {
    let totalPrice = 0;
    for (const product of products) {
        totalPrice += product.quantity * product.price;
    }
    return Number(totalPrice);
};


exports.addProductToCart = async (req, res) => {
    try {
        const { userId, productId, name, color, image, price } = req.body;
        const existingCart = await Cart.findOne({ userId });

        if (!existingCart) {
            const newCart = new Cart({ userId, products: [{ productId, name, color, image, price }] });
            await newCart.save();
            return res.status(200).json(newCart);
        } else {
            const existingProduct = existingCart.products.find(product => product.productId.toString() === productId.toString());

            if (existingProduct) {
                if (existingProduct.quantity < 8) {
                    existingProduct.quantity += 1;
                } else {
                    return res.status(400).json({ message: "Quantity can't exceed 8!" });
                }
            } else {
                existingCart.products.push({ productId, name, color, image, price, quantity: 1 });
            }
        }
        const response = await existingCart.save();
        res.status(200).json({ message: 'Product Added to Cart!', response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getCartByUserId = async (req, res) => {
    try {
        const { userId } = req.body;
        const cart = await Cart.findOne({ userId });
        const totalPrice = calculateTotalPrice(cart?.products);
        const cartDetails = { ...cart.toObject(), totalPrice };
        res.status(200).json(cartDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateCart = async (req, res) => {
    try {
        const { productId, quantity, userId } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(product => String(product.productId) === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }

        cart.products[productIndex].quantity = quantity;

        await cart.save();

        const totalPrice = calculateTotalPrice(cart?.products);

        const cartDetails = { ...cart.toObject(), totalPrice };
        res.status(200).json(cartDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCartByUserId = async (req, res) => {
    try {
        const { userId } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        await cart.deleteOne({ userId });
        res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


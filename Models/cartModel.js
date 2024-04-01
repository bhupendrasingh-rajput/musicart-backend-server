const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
            name: { type: String, required: true },
            color: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true, default: 1 }
        }
    ]
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;

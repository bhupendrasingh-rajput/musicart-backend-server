const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    feedback: [{
        type: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }]
});

const User = mongoose.model('user', userSchema);
module.exports = User;
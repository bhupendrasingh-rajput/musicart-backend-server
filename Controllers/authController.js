const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../Models/userModel');

const userRegister = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        if (!name || !phone || !email || !password) {
            return res.status(400).json({
                message: "Enter all details!",
                success: false
            })
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(404).json({
                message: "User already exists!",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            phone,
            email,
            password: hashedPassword
        })

        const userResponse = await newUser.save();

        const token = jwt.sign({ userId: userResponse._id }, process.env.SECRET_KEY);

        res.status(200).json({
            message: "User created Successfully!",
            name: userResponse.name,
            token: token,
        });

    } catch (err) {
        console.log("Error : ", err);
    }
}

const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Enter all the credentials!",
                success: false
            })
        }

        let registeredUser = await User.findOne({ email: username });

        if (!registeredUser) {
            registeredUser = await User.findOne({ phone: username });
        }

        if (!registeredUser) {
            return res.status(404).json({
                message: "User Does not exist!",
                success: false
            })
        }

        const matchedPassword = await bcrypt.compare(password, registeredUser.password);

        if (!matchedPassword) {
            return res.status(400).json({
                message: "Unmatched Password!",
                success: false
            })
        }

        const token = jwt.sign({ userId: registeredUser._id }, process.env.SECRET_KEY);

        res.json({
            message: "User Logged in Successfully!",
            name: registeredUser.name,
            token: token
        })

    } catch (err) {
        console.log("Error: ", err);
    }
}


const addFeedback = async (req, res) => {
    try {
        const { userId, type, content } = req.body;

        if (!type || !content) {
            return res.status(400).json({
                message: "Enter all details!",
            })
        }

        const authorizedUser = await User.findById(userId);

        if (!authorizedUser) {
            return res.status(404).json({
                message: "User not found!"
            });
        }

        authorizedUser.feedback.push({ type, content });
        await authorizedUser.save();
        return res.status(200).json({ message: "Feedback added!" });

    } catch (error) {
        console.log("Error: ", error);
    }
}

module.exports = { userRegister, userLogin, addFeedback };
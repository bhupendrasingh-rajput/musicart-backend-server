const express = require('express');
const app = express();

require('dotenv').config();
const cors = require('cors');
const connectDB = require('./Config/mongoDB');
const port = process.env.PORT || 8000;
const authRoutes = require("./Routes/authRoutes");
const productRoutes = require("./Routes/productRoutes");
const cartRoutes = require('./Routes/cartRoutes');
const invoiceRoutes = require('./Routes/invoiceRoutes')

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json("Welcome to the Server!");
})

app.get("/health", (req, res) => {
    res.json({
        service: "Musicart Server",
        status: "Active",
        time: new Date()
    })
})

app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/invoice', invoiceRoutes)

app.listen(port, (err) => {
    if (!err) {
        console.log("Server is Up & Running on port: ", port, "🔥");
    } else {
        console.log("Error Connecting to the server ❌")
    }
})
const Product = require('../Models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const { type, brand, color, minPrice, maxPrice, field, order } = req.query;
        let filter = {};

        if (type) {
            filter.type = type;
        }

        if (brand) {
            filter.brand = brand;
        }

        if (color) {
            filter.color = color;
        }

        if (minPrice && maxPrice) {
            filter.price = {
                $gte: minPrice,
                $lt: maxPrice
            };
        }

        let productsDetails = await Product.find(filter);

        if (field && order) {
            const sortFunction = (a, b) => {
                if (field === 'name') {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if (order === 'desc') {
                        if (nameA < nameB) {
                            return 1;
                        } else if (nameA > nameB) {
                            return -1;
                        } else {
                            return 0;
                        }
                    } else {
                        if (nameA < nameB) {
                            return -1;
                        } else if (nameA > nameB) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                } else if (field === 'price') {
                    return order === 'desc' ? b.price - a.price : a.price - b.price;
                } else {
                    return 0;
                }
            };
            productsDetails = productsDetails.sort(sortFunction);
        }
        
        res.status(200).json(productsDetails);
    } catch (error) {
        console.log(error);
    }
}

const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        if (!productId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }
        const productDetails = await Product.findById(productId);
        if (!productDetails) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        res.status(200).json(productDetails);
    } catch (error) {
        console.log(error);
    }
}
module.exports = { getAllProducts, getProductById };
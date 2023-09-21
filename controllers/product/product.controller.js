const Product = require("../../model/product/product.model");

const getProducts = async (req, res) => {
    const { page, amount } = req.query;
    const products = await Product.getProducts(+page, +amount);
    res.json(products);
};

const getProductsById = async (req, res) => {
    const id = req.params.id;
    const product = await Product.getProductById(id);
    res.json(product);
};

module.exports = {
    getProducts,
    getProductsById,
};

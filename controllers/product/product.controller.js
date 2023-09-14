const Product = require('../../model/product/product.model');



const getProducts = async (req, res) => {
    const { page, amount } = req.query;
    const products = await Product.getProducts(+page, +amount);
    res.json(products);
};

module.exports = {
    getProducts
};

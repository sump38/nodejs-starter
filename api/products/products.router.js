const express = require("express");
const router = express.Router();
const {
    getProducts,
    getProductsById,
} = require("../../controllers/product/product.controller");

router.get("/", getProducts);

router.get("/:id", getProductsById);

//TODO: add search endpoint

router.use((err, req, res, next) => {
    res.status(400).json({
        error: err.message,
    });
});

module.exports = router;

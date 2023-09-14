const express = require('express');
const productsList = require('../../data/products');
const { getDB } = require('../../db/db');

const router = express.Router();

router.get('/', async (req, res) => {
    const db = getDB();
    const collection = db.collection('products');
    const products = await collection.find().toArray();
    res.json(products);
}
);

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const product = productsList.find(product => product.id === id);
    if (product) {
        res.json(product);
    } else {
        next('Product not found');
    }
});

//TODO: add search endpoint

router.use((err, req, res, next) => {
    res.status(404).json({
        error: err
    });
});


module.exports = router;
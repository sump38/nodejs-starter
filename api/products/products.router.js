const express = require('express');
const router = express.Router();
const { getProducts } = require('../../controllers/product/product.controller');


router.get('/', getProducts);

// router.get('/:id', (req, res, next) => {
//     const id = req.params.id;
//     const product = productsList.find(product => product.id === id);
//     if (product) {
//         res.json(product);
//     } else {
//         next('Product not found');
//     }
// });

//TODO: add search endpoint

router.use((err, req, res, next) => {
    res.status(400).json({
        error: err.message
    });
});


module.exports = router;
const express = require('express');
const cartRouter = require('./cart/cart.router');
const productsRouter = require('./products/products.router');
const userRouter = require('./user/user.router');

const router = express.Router();
router.use(express.json());

router.use('/cart', cartRouter);
router.use('/products', productsRouter);
router.use('/user', userRouter);

module.exports = router;
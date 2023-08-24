const express = require('express');
const users = require('../../data/users');
const { getCartData, updateCart, clearCart, initCart } = require('../../controllers/cart/cart.controller');

const router = express.Router();

router.use(initCart);

router.get('/', getCartData);

router.post('/update', updateCart);

router.post('/clearCart', clearCart);

module.exports = router;
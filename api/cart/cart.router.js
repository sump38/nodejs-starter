const express = require('express');
const users = require('../../data/users');
const Cart = require('../../model/cart/cart');

const router = express.Router();


router.use((req, res, next) => {
  if (req.session.user) {
    console.log('user', req.session.user);
    req.session.cart = new Cart(req.session.user.name);
  } 
  if (!req.session.cart) {
    req.session.cart = new Cart(null);
  } else {
    req.session.cart = new Cart(req.session.cart.userid, req.session.cart.items);
  }
  next();
});

/*
  GET /cart
  get all items
 */
router.get('/', (req, res, next) => {
  // console.log(users);
  res.json(req.session.cart.items);
});

//POST update cart items
router.post('/update', (req, res, next) => {
  const product = req.body;
  const cart = req.session.cart;
  cart.updateCartItem(product);
  res.json(cart.items);
});

router.post('/clearCart', (req, res, next) => {
  req.session.cart = [];
  res.json(req.session.cart);
});



module.exports = router;
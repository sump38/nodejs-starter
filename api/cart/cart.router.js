const express = require('express');
const users = require('../../data/users');

const router = express.Router();


router.use((req, res, next) => {
  if (req.session.user) {
    console.log('user has cart');
    console.log('session cart', req.session.user.cart);
    console.log('user cart', users[0].cart);
    req.session.cart = req.session.user.cart;
  } else {
    if (!req.session.cart) {
      req.session.cart = [];
    }
  }


  // if (!req.session.cart) {
  //   if (req.session.user) {
  //     req.session.cart = req.session.user.cart;
  //   } else {
  //     req.session.cart = [];
  //   }
  // }
  next();
});

/*
  GET /cart
  get all items
 */
router.get('/', (req, res, next) => {
  // console.log(users);
  res.json(req.session.cart);
});

//POST update cart items
router.post('/update', (req, res, next) => {
  const product = req.body;
  const cart = req.session.cart;
  cart.push(product);
  res.json(cart);
});

router.post('/clearCart', (req, res, next) => {
  req.session.cart = [];
  res.json(req.session.cart);
});



module.exports = router;
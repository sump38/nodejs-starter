const express = require('express');
const cors = require('cors');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const cartRouter = require('./api/cart/cart.router');

// list of products
const products = require('./data/products');

const users = [
  {
    name: 'Moshe',
    cart: [],
    password: 'abcd'
  },
  {
    name: 'Yishay',
    password: '1234',
    cart: []
  }
];

app.use(cors());

app.use(session({
  secret: 'fullstack netcraft 99',
  resave: false,
  saveUninitialized: true,
}));

app.use((req, res, next) => {
  if(!req.session.cart) {
    req.session.cart = users[0].cart;
  }
  req.session.users = users;
  next();
});

app.use('/api/cart', cartRouter);


app.post('/login', (req, res) => {
  //proccess user and password
  const userLoginMock = {
    name: 'Moshe',
    password: 'abcd'
  };
  const userData = users.find(user => {
    return (user.name === userLoginMock.name && user.password === userLoginMock.password);
  });

  if(userData) {
    req.session.loggedIn = true;
    req.session.user = userData;
    req.session.cart = userData.cart;
    res.json(userData.cart);
  } else {
    res.status(401).json('Error occured');
  }

});

app.use(express.static('public'));

app.use(express.json());

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/cart', (req, res) => {
  const product = req.body;
  const cart = req.session.users[0].cart;
  cart.push(product);
  res.json(cart);
});

app.get('/cart', (req, res) => {
  console.log(users);
  res.json(req.session.users[0].cart);
});




app.use((req, res) => {
  res.statusCode = 404;
  res.end('default'); 
})

app.listen(3001, () => {
});
const express = require('express');
const cors = require('cors');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

// list of products
const products = [
  {
    id: 1,
    name: 'product 1',
    price: 100,
    description: 'this is product 1',
    amount: 99
  },
  {
    id: 2,
    name: 'product 2',
    price: 200,
    description: 'this is product 2',
    amount: 99
  },
  {
    id: 3,
    name: 'product 3',
    price: 300,
    description: 'this is product 3',
    amount: 99
  },
];

const users = [];


// function getProductsPage(req, res) {
//   res.sendFile(__dirname + '/public/index.html');
// }


// app.get('/style.css', (req, res) => {
//   res.sendFile(__dirname + '/public/style.css');
// })
// app.get('/', getProductsPage);

// app.get('/index.html', getProductsPage);
  

app.use(cors());

app.use(session({
  secret: 'fullstack netcraft 99',
  resave: false,
  saveUninitialized: true,
}));

app.use((req, res, next) => {
  if(!req.session.cart) {
    req.session.cart = [];
  }
  next();
})





// app.use(cookieParser('ab4qdd1'));

// app.use((req, res, next) => {
//   if(!req.cookies.cartID) {
//     const user = {
//       id: users.length,
//       cart: []
//     }
//     users.push(user);
//     res.cookie('cartID', user.id, {
//       maxAge: 1000 * 60 * 60 * 24 * 7,
//       httpOnly: true
//     });
//   }
//   next();
// })

app.use(express.static('public'));

app.use(express.json());

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/cart', (req, res) => {
  const product = req.body;
  const cart = req.session.cart;
  cart.push(product);
  res.json(cart);
});

app.get('/cart', (req, res) => {
  res.json(req.session.cart);
});




app.use((req, res) => {
  res.statusCode = 404;
  res.end('default'); 
})

app.listen(999, () => {
});
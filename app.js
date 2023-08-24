const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();
const apiRouter = require('./api/api');
const authRouter = require('./auth/auth.router');


// list of products
const products = require('./data/products');
const users = require('./data/users');

app.use(cors());

app.use(session({
  secret: 'fullstack netcraft 99',
  resave: false,
  saveUninitialized: true,
}));

app.use((req, res, next) => {
  console.log(req.session.id);
  next();
});

app.use(express.static('public'));

app.use(authRouter);
app.use('/api', apiRouter);

app.use((req, res) => {
  res.statusCode = 404;
  res.end('default');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.statusCode = 500;
  res.send('Error occured: ' + err.message);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
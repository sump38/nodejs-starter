const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();
const apiRouter = require('./api/api');
const authRouter = require('./auth/auth.router');
const { connectToDB } = require('./db/db');
const config = require('dotenv').config();

console.log(process.env.PORT);


// list of products
const products = require('./data/products');
const users = require('./data/users');

app.use(cors());

app.use(session({
  secret: 'fullstack netcraft 99',
  resave: false,
  saveUninitialized: true,
}));

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

connectToDB(process.env.MONGODBURL, ({ client, err }) => {
  if (err) {
    throw err;
  } else {
    app.listen(process.env.PORT, () => {
      console.log('server started');
    });
  }
});
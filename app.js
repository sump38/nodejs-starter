const express = require('express');
const cors = require('cors');
const { application } = require('express');
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


// function getProductsPage(req, res) {
//   res.sendFile(__dirname + '/public/index.html');
// }


// app.get('/style.css', (req, res) => {
//   res.sendFile(__dirname + '/public/style.css');
// })
// app.get('/', getProductsPage);

// app.get('/index.html', getProductsPage);
  

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

app.get('/products', (req, res) => {
  res.json(products);
});



app.use((req, res) => {
  res.statusCode = 404;
  res.end('default'); 
})

app.listen(999, () => {
});
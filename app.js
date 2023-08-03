const { response } = require('express');
const express = require('express');
const cors = require('cors');
const app = express();

//list of drinks
const drinks = [
  {name: 'coffee', price: 2},
  {name: 'tea', price: 2},
  {name: 'lemonade', price: 3},
  {name: 'coke', price: 2},
];



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


// app.use((request, response, next)=> {
//   let body = '';
//   request.on('data', (chunk) => {
//     body += chunk;
//   });
//   request.on('end', () => {
//     request.body = JSON.parse(body);
//     next();
//   })
// })


app.use((req, res, next) => { //use postman some request to node //for example to check username and pasword ,always going to work

  console.log('request recieved: ' +  req.url);
  console.log('request.body:', req.body);
  next();
});

app.use('/:id/abc/:name-:lastname', (request, response) => {
  console.log(request.url);
  const fullUrl = 'hello/' + request.url;
  response.end('hello world');
});



app.use('/hello/world', (req, res) => {
  res.end('hello helloworld');
});


app.get('/drinks', (req, res) => {
  res.json(drinks);
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/public/about.html');
});

app.use((req, res) => {
  res.statusCode = 404;
  console.log("the req body is =",req.body);
  res.end('default');
  
})

app.listen(999 , () => { //w/e father has the child has and know even makes it better

// debugger;
});
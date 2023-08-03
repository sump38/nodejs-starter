const { response } = require('express');
const express = require('express');

const app = express();

app.use(express.json());

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

app.use('/hello', (request, response) => {
  response.end('hello world');
});

app.use('/about', (req, res) => {
  res.end('this is an about page');
});

app.use((req, res) => {
  res.statusCode = 404;
  console.log("the req body is =",req.body);
  res.end('default');
  
})

app.listen(999 , () => { //w/e father has the child has and know even makes it better

// debugger;
});
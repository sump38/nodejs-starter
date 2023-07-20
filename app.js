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


app.use((req, res, next) => {
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
  res.end('default');
})

app.listen(999);
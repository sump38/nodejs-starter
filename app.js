const http = require('http');

const hostname = 'localhost';
const port = 3000;

const serverListener = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write(`<html><body><div>hello world</div></body></html>`);
  res.end('');
}

const server = http.createServer(serverListener);

server.listen(port, hostname, () => {
  console.log('server started');
});
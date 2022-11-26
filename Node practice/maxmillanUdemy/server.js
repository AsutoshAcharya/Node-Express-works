//require used to import something in js
//path to your module starts with "./yourModule"
const http = require("http");
//called by node js every time a request is made to server

//createServer returns server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  //   process.exit();
});

server.listen(3000);

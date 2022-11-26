//require used to import something in js
//path to your module starts with "./yourModule"
const http = require("http");
//called by node js every time a request is made to server

//createServer returns server
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  res.setHeader("Content-Type", "text/html");

  res.write("<html>");
  res.write("<head><title>My fist server</title> </head>");
  res.write("<body><h1>My first node.js server</h1></body>");
  res.write("</html>");
  res.end();
  //   process.exit();
});

server.listen(3000);

//require used to import something in js
//path to your module starts with "./yourModule"
const http = require("http");
const routes = require("./routes");
// const { text } = require("stream/consumers");
//called by node js every time a request is made to server

//createServer returns server

const server = http.createServer(routes.handler);

server.listen(3000);

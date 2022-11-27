const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter message</title> </head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><br/><button type="submit">send</button> </form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message, (error) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My fist server</title> </head>");
  res.write("<body><h1>My first node.js server</h1></body>");
  res.write("</html>");
  res.end();
  //   process.exit();
};

module.exports = {
  handler: requestHandler,
  text: "some text",
};

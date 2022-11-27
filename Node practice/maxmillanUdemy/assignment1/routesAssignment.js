const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write(`<body>Hello User</body>`);
    res.write(
      '<form action="/create-user" method="POST"><input type="text" name="username"><br/><button type="submit">send</button> </form>'
    );
    return res.end();
  }
  if (url === "/users") {
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>User 1</li>");
    res.write("</ul>");
    res.write("</body>");
    return res.end();
  }
  if (method === "POST" && url === "/create-user") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const username = parseBody.split("=")[1];
      fs.writeFile("user.txt", username, (error) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
};

module.exports = requestHandler;

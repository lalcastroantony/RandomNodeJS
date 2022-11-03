const handleRequests = (request, response) => {
  switch (request.url) {
    case "/":
      response.setHeader("Content-Type", "text/html");
      response.write("<html>");
      response.write("<head><title>Assignment 1</title></head>");
      response.write(
        '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
      );
      response.write("</html>");
      response.end();
      break;
    case "/users":
      response.write(
        "<html><head><title>Home screen</title></head><body><ul><li>Lal Castro</li><li>Pidal Castro</li><li>Antony</li></ul></body></html>"
      );
      response.end();
      break;
    case "/create-user":
      const body = [];
      request.on("data", (chunk) => {
        body.push(chunk);
      });
      request.on("end", () => {
        const parsedBody = Buffer.concat(body).toString();
        console.log(parsedBody.split("=")[1]);
      });
      response.statusCode = 302;
      response.setHeader("Location", "/");
      response.end();
      break;
  }
};
module.exports = handleRequests;

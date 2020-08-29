const fs = require("fs");

const requestListener = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>All the Feels</title></head>");
    res.write(
      '<body><h1>Hey there, welcome to the mood tracker!</h1><p>Enter your mood below and hit send to save your mood.</p><form action = "/mood" method="POST" ><input type = "text" name="mood"><button>Send</button></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/mood" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody)
      const mood = parsedBody.split("=")[1];
      fs.writeFile("user_mood.txt", mood);
      return res.end();
    });
  }
};

module.exports = requestListener;


const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile('./view/home.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});

const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const User = require("./models/userSchema");
app.set("view engine", "ejs");
app.use(express.static('public'))


// Auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.get("/", (req, res) => {
  User.find()
    .then((result) => {
      res.render("home", { users: result });
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/index.html", (req, res) => {
  res.send("<h1>data sent successfuly</h1>");
});

// app.listen(port, () => {
//   console.log(`http://localhost:${port}/`);
// });

mongoose
  .connect(
    "mongodb+srv://cadiwalid440:b0fBU7GKr1LgqmjP@cluster0.mxg1loi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.redirect("/index.html");
    })
    .catch((err) => {
      console.log(err);
    });
});

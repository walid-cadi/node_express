const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
const User = require("./models/userSchema");
app.set("view engine", "ejs");
app.use(express.static("public"));
var moment = require("moment"); // require
var methodOverride = require("method-override");
app.use(methodOverride("_method"));
const country_list = require("./views/components/country");
// Auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// get request
app.get("/", (req, res) => {
  // result ==> array of objects
  User.find()
    .then((result) => {
      res.render("index", {
        users: result,
        currentPage: "index",
        moment: moment,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving users");
    });
});

app.get("/user/add.html", (req, res) => {
  res.render("user/add", { currentPage: "add", country_list: country_list });
});

app.get("/edit/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", {
        user: result,
        moment: moment,
        country_list: country_list,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving user");
    });
});

// view user
app.get("/view/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { user: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving user");
    });
});

// post request
app.post("/user/add", (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
    country: req.body.country,
    gender: req.body.gender,
  });
  console.log(user);
  user
    .save()
    .then(() => {
      console.log("User added successfully");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error adding user");
    });
});

// delete user
app.delete("/delete/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error deleting user");
    });
});

// update user
app.put("/update/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error updating user");
    });
});

// query
app.post("/search", (req, res) => {
  const search = req.body.search.trim();

  User.find({
    $or: [{ firstName: search }, { lastName: search }],
  })
    .then((result) => {
      console.log(result);
      res.render("./user/search", {
        users: result,
        moment: moment,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error retrieving users");
    });
});

mongoose
  .connect(
    "mongodb+srv://cadiwalid440:b0fBU7GKr1LgqmjP@cluster0.mxg1loi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

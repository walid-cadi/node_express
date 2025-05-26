const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
var moment = require("moment"); // require
const country_list = require("../views/components/country");

// get request
router.get("/", (req, res) => {
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

router.get("/user/add.html", (req, res) => {
  res.render("user/add", { currentPage: "add", country_list: country_list });
});

router.get("/edit/:id", (req, res) => {
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
router.get("/view/:id", (req, res) => {
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
router.post("/user/add", (req, res) => {
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
router.delete("/delete/:id", (req, res) => {
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
router.put("/update/:id", (req, res) => {
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
router.post("/search", (req, res) => {
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

module.exports = router;

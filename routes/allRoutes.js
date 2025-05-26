const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController")


// get request
router.get("/", userController.index);

router.get("/user/add.html", userController.create );

router.get("/edit/:id", userController.edit);

// view user
router.get("/view/:id", userController.show);

// post request
router.post("/user/add", userController.store);

// delete user
router.delete("/delete/:id", userController.destroy);

// update user
router.put("/update/:id", userController.update);

// query
router.post("/search", userController.search);

module.exports = router;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the User model
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  age: Number,
  country: String,
  gender: String,
});
// Create the User model using the schema
const User = mongoose.model("user", userSchema);

// Export the User model for use in other files
module.exports = User;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the User model
const userSchema = new Schema({
  name: String,
});
// Create the User model using the schema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other files
module.exports = User;
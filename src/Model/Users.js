const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: true,
  },
  step: {
    type: String,
    default: 0,
  },
});
const users = mongoose.model("users", UserSchema);
module.exports = users;

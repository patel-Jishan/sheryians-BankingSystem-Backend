const mongoose = require("mongoose");

function connectToDB() {
  return mongoose.connect(process.env.MONGO_URI); // ✅ return important
}

module.exports = connectToDB;
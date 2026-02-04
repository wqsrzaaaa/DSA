const mongoose = require("mongoose");


const notes = new mongoose.Schema({
  todo : String,
})

const model = mongoose.model('todo' , notes)
module.exports = model
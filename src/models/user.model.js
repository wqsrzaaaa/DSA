const { default: mongoose } = require("mongoose");

const user = new mongoose.Schema({
  username : String ,
  email : {
    type : String,
    unique : true,
  },
  password : String
})

const model = mongoose.model("user" , user)

module.exports = model
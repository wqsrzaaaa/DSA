const { default: mongoose } = require("mongoose");

function db() {
  mongoose.connect('mongodb://localhost:27017/day-7').then(()=>{
    console.log('db connected');
    
  })
}

module.exports = db
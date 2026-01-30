const express = require('express');
const { db } = require('./src/config/db');
const dotenv = require('dotenv')
dotenv.config()
const app = express()


db()

app.listen(3000 , ()=>{
  console.log("server is running on port 3000");
})
const express = require('express')
const model = require('../models/user.model')
const route = express.Router()

route.post('/' , async (req , res)=>{

  const {username , email , password } =  req.body
  const existinguser = await model.findOne({email})

  if (existinguser) res.status(400).json({ messege :  'email already exist'})

  const userdata  = await model.create({
    username , email , password
  })
  res.status(201).json({
    messege : "user craeted",
    userdata
  })

})

module.exports = route
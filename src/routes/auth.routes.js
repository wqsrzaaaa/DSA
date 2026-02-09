const express = require('express')
const model = require('../models/user.model')
const route = express.Router()
const jwt = require("jsonwebtoken")

route.post('/', async (req, res) => {

  const { username, email, password } = req.body
  const existinguser = await model.findOne({ email })

  if (existinguser) res.status(400).json({ messege: 'email already exist' })

  const userdata = await model.create({
    username, email, password
  })

  const token = jwt.sign({
    id: userdata._id,
    email: userdata.email
  },
    process.env.JWT_SEC

  )

  res.cookie('jwt-token' , token)

  res.status(201).json({
    messege: "user craeted",
    userdata,
    token
  })

})

module.exports = route
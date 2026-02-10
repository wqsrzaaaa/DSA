const express = require('express')
const model = require('../models/user.model')
const route = express.Router()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

route.post('/register', async (req, res) => {

  const { username, email, password } = req.body
  const existinguser = await model.findOne({ email })

  if (existinguser) res.status(400).json({ messege: 'email already exist' })

  const hash = await bcrypt.hash(password, 10)

  const userdata = await model.create({
    username, email, password : hash
  })

  const token = jwt.sign({
    id: userdata._id,
    email: userdata.email
  },
    process.env.JWT_SEC

  )

  res.cookie('jwt-token', token)

  res.status(201).json({
    messege: "user craeted",
    userdata,
    token
  })

})


route.post('/login', async (req, res) => {

  const { email, password } = req.body
  const user = await model.findOne({ email })
  if (!user) {
    return res.status(401).json({ message: "Invalid input" })
  }
  const matchpass = bcrypt.compare(password , user.password )
  if (!matchpass) {
    return res.status(401).json({ message: "Invalid input" })
  }


  const token = jwt.sign({
    id: user._id,
  }, process.env.JWT_SEC)

  res.cookie("token", token)

  res.status(200).json({
    messege: "user logged in",
    user
  })


})


route.get('/alluser', async (req, res) => {

  const allusers = await model.find()
  res.status(200).json({
    messege: "All users",
    allusers
  })
})

module.exports = route
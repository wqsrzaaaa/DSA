const express  = require('express')
const usercreate = require('./routes/auth.routes')
const cookieParser = require('cookie-parser')

const app =  express()
app.use(express.json())

app.use(cookieParser())

app.use('/auth' , usercreate )


module.exports = app
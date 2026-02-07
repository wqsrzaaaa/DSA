const express  = require('express')
const usercreate = require('./routes/auth.routes')

const app =  express()
app.use(express.json())

app.use('/register' , usercreate )


module.exports = app
const express = require('express')
const model = require('./config/schema')
const cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json())

app.get('/todo' , async (req , res)=>{
  const data = await model.find()
  res.json(data)
})

app.post('/todo' , async (req , res)=>{
    const data = await model.create({
      todo : await req.body.todo
    })

    res.status(201).json({
      messege : "todo crated",
      data
    })
})


app.delete('/todo/:id' , async (req , res)=>{
  const deleteTodo = await  model.findByIdAndDelete(req.params.id)
  res.json({
    messege : "deleted",
    deleteTodo
  })
})

app.patch('/todo/:id' , async (req , res)=>{
  const patch = await model.findByIdAndUpdate(req.params.id , {
    todo : req.body.todo,
  } , {new : true})

  res.json({
    messege : "updated",
    patch
  })

})

module.exports = app
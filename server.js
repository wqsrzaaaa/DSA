const express = require('express')

const app = express()

app.use(express.json())

let notes = []

app.get('/' , (req , res)=>{
  res.send(notes)
})

app.post('/' , (req , res)=>{
   notes.push(req.body)
   res.send(notes)
})

app.delete('/notes/:index' , (req , res)=> {
  delete notes[req.params.id]
  res.send(notes)

  console.log(req.body);
  
})

app.patch('/:id' , (req , res)=>{
  notes[req.params.id].description = req.body.description
  res.send(notes)
})

app.listen(3000 , ()=>{
  console.log('server is running on port 3000');
  
})
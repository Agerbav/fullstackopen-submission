require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

const app = express()

app.use(express.json())
app.use(express.static('dist'))

//Middleware used when send a request to the server
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

//Middleware used when requests made to non existent routes happened
// const unknownEndpoint = (request, response) => { 
//   response.status(404).send({ error: 'unknown endpoint' })
// }

// app.use(unknownEndpoint)

app.get('/', (request, response) => {
  response.send('<h1>Hello!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  Note.findById(id).then(note=>{
    response.json(note)
  })

})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note=>note.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0 
    ? Math.max(...notes.map(n=>Number(n.id)))
    : 0
  return String(maxId+1)  
}

app.post('/api/notes', (request, response) => {  
  const body = request.body
  if(!body.content){
    return response.status(400).json({
      error: "content missing"
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote=>{
    response.json(savedNote)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
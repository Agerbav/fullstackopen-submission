const express = require("express")
const app = express()

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//get all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

//get info for current state
app.get('/info', (request, response) => {
  const now = new Date()
  const total = persons.length
  const info = `
  <p>Phonebook has info for ${total} people</p>
  <p>${now}</p>`
  response.send(info)
})

//get details from person
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(persons => persons.id === id)
  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
})

//detele person from server
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person=>person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
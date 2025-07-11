const express = require("express")
const app = express()
const morgan  = require("morgan")
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :content"))

morgan.token('content', (req, res) => {
  console.log(req.body)
  return JSON.stringify(req.body)
})

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

//create new person
app.post('/api/persons', (request, response) => {
  const body = request.body
  const id = Math.floor(Math.random() * 99999)

  if(!body.name || !body.number){
    return response.status(400).json({
      error: "The name or number is missing"
    })
  }
  const personsName = persons.map(person=>person.name)
  // console.log(personsName)
  if(personsName.find(name=> name === body.name)){
    return response.status(409).json({
      error: "The name must be unique"
    })
  }

  const person = {
    id: String(id),
    name: body.name,
    number: body.number,
  }


  persons = persons.concat(person)
  // console.log(body, id)
  response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
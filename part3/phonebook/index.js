require('dotenv').config()
const express = require('express')
const morgan  = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(express.static('dist'))

morgan.token('content', (req) => {
  console.log(req.body)
  return JSON.stringify(req.body)
})


//get all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

//get info for current state
app.get('/info', (request, response) => {
  const now = new Date()
  Person.countDocuments().then(total => {
    const info = `
    <p>Phonebook has info for ${total} people</p>
    <p>${now}</p>`
    response.send(info)
  })
})

//get details from person
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})

//detele person from server
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

//create new person
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if(!body.name || !body.number){
    return response.status(400).json({
      error: 'The name or number is missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(result => {
    response.json(result)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  // console.log(name, number)
  Person.findById(request.params.id)
    .then(person => {
      if(!person){
        return response.status(404).end()
      }
      console.log(person)
      person.name = name
      person.number = number

      person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


import { useState, useEffect } from 'react'
import personServices from "./services/persons"
import Notification from './components/Notification'

const Filter = ({filter, handleFilterChange}) =>{
  return(
    <div>
      Filter shown with <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}
const PersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, handleAddPerson}) =>{
  return (
    <form onSubmit={handleAddPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
const Person = ({person, handleDelete}) => {
  return (
    <li>{person.name} {person.number} <button onClick={() => handleDelete(person)}>Delete</button></li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [status, setStatus] = useState(1)

  useEffect(()=>{
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })

  }, [])

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) =>{
    setFilter(event.target.value)
  }

  const handleAddPerson = (event) =>{
    event.preventDefault()
    if(persons.map(person=>person.name).includes(newName)){
      const person = persons.find(p => p.name === newName)
      const newPerson = {...person, number: newNumber}
      if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        personServices
          .update(person.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
            setMessage(`Updated ${returnedPerson.name}`)
            setStatus(1)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessage(`Information of ${newName} has already been deleted from the server`)
            setStatus(0)            
            setPersons(persons.filter(p => p.id !== person.id))
            setTimeout(()=>{
              setMessage(null)
            }, 5000)
          })
      }
    }
    else{
      const newPerson = {
        name: newName,
        number: newNumber,
        id: `${persons.length + 1}`,
      }

      personServices
        .create(newPerson)
        .then( returnedPerson =>{
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
          setMessage(`Added ${newName}`)

        })
    }
  }
  const handleDelete = person => {
    const deletedPersonId = person.id
    if(confirm(`Delete ${person.name}?`)){
      personServices
        .remove(deletedPersonId)
        .then(() => {
          setPersons(persons.filter(newPerson => deletedPersonId !== newPerson.id))
        })
    }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} status={status}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} handleAddPerson={handleAddPerson}/>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => 
          <Person key={person.name} person={person} handleDelete={handleDelete} />
        )}
      </ul>
    </div>
    
  )
}

export default App
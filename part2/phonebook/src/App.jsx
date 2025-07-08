import { useState, useEffect } from 'react'
import personServices from "./services/persons"

const Filter = ({filter, handleFilterChange}) =>{
  return(
    <div>
      Filter shown with <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}
const PersonForm = ({newName, handleNameChange, newNumber, handleNumberChange, addPerson}) =>{
  return (
    <form onSubmit={addPerson}>
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

  const addPerson = (event) =>{
    event.preventDefault()
    if(persons.map(person=>person.name).includes(newName)){
      alert(`${newName} is already added in the phonebook`)
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
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
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
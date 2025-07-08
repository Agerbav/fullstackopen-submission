import { useState, useEffect } from 'react'
import countriesServices from "./services/countriesServices"
import Countries from './components/Countries'

function App() {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(()=>{
    countriesServices
      .getAll()
      .then( returnedCountries =>{
        setCountries(returnedCountries)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const handleShowCountry = (country) => {
    setFilter(country.name.common)
  }

  const shownCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  // console.log(shownCountries)
  
  return(
    <div>
      Find countries <input value={filter} onChange={handleFilterChange} />
      <Countries countries={shownCountries} handleShowCountry={handleShowCountry} />
    </div>
  )
}

export default App

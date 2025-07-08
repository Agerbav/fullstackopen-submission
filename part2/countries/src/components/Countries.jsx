import React from "react"

const Country = ({country, showSingle}) => {
  // console.log(country)
  if(showSingle === 1){
    const flag = country.flags.png
    return(
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(language => 
            <li key={language}>{language}</li>
          )}
        </ul>
        <img src={flag} alt="" />
      </div>
      
    )
  }
  return(
    <div>
      {country.name.common}
    </div>
  )
}

function Countries({ countries }) {
  if(countries.length > 10){
    return(
      <div>
        Too many matches. Please specify filter
      </div>
    )
  } 
  if(countries.length < 11 && countries.length > 1){
    console.log("This is inside Countries Component", countries)
    return(
      <div>
        {countries.map(country =>
          <Country key={country.cca3} country={country} showSingle={0}/>
        )}
      </div>
    )
  }
  if(countries.length === 0){
    return(
      <div>
        No Countries Found
      </div>
    )
  }
  return(
      <div>
        {countries.map(country =>
          <Country key={country.cca3} country={country} showSingle={1}/>
        )}
      </div>
    )
  
  
}

export default Countries
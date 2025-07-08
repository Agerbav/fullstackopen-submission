import CountrySingleList from "./CountrySingleList"
import CountryDetails from "./CountryDetails"

function Countries({ countries, handleShowCountry }) {
  if(countries.length > 10){
    return(
      <div>
        Too many matches. Please specify filter
      </div>
    )
  } 
  if(countries.length < 11 && countries.length > 1){
    // console.log("This is inside Countries Component", countries)
    return(
      <div>
        {countries.map(country =>
          <CountrySingleList key={country.cca3} country={country} handleShowCountry={handleShowCountry}/>
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
          <CountryDetails key={country.cca3} country={country}/>
        )}
      </div>
    )
  
  
}

export default Countries
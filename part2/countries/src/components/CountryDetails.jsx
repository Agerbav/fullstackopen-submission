const CountryDetails = ({country}) => {
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

export default CountryDetails
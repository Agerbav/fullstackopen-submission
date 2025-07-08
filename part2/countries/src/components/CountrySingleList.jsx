const CountrySingleList = ({country, handleShowCountry}) => {
  return(
    <div>
      {country.name.common} <button onClick={()=>handleShowCountry(country)}>Show</button>
    </div>
  )
}

export default CountrySingleList
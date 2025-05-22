import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';


import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';


const App =() => {

  //using useState
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  //using useEffect
  useEffect(() => {
    //this is provided by the website , this endpoint
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => setCountries(response.data));
  }, []);

  //creating handleFilterChange function
  const handleFilterChange =(event) =>{
    setFilter(event.target.value);
    setSelectedCountry(null); // why null , to reset the selected country 
  }

  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <>
      <h1>Country Finder</h1>  
      <input value={filter} onChange={handleFilterChange} placeholder='search country ...'/>
    
    {/* used ternary operator ok  */}
      {
        filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length === 1 ? (
            <CountryDetails country={filteredCountries[0]} />
        ) : ( 
            <CountryList countries={filteredCountries} setSelectedCountry={setSelectedCountry} />
        )
      }

      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </>


  );
}

export default App;
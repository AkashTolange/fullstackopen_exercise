

const CountryList =( { countries, setSelectedCountry} ) =>{

    return (
        <div>
            {countries.map(country => (
                <div key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => setSelectedCountry(country)}>show</button>
                </div>
            ))}
        </div>
    )
}

export default CountryList;
import { useEffect } from "react";
import { useState } from "react";

import axios from 'axios';

//Object.values(object)
//this method :It extracts just the values (not keys) from an object and gives them back as an array.

// pahela nae destructre garnu 

const CountryDetails =({ country }) =>{

    // const { country } =props;

    const [weather, setWeather] =useState(null);
    //i do not know how this is working import.meta.enb.VITE_WEATHER_KEY
    const api_key = import.meta.env.VITE_WEATHER_KEY;

    //USING useEffect
    useEffect(() => {
        //optional chaining 
        const capital = country.capital?.[0];
        if(!capital) return;
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
            .then(response => setWeather(response.data))
            .catch(error => console.error("weather api error:", error));
    }, [country, api_key]);

    return (
        <div>
            <h2>{country.name.common}</h2>

            <p><strong>Capital:</strong> {country.capital[0]}</p>

            <p><strong>Area:</strong> {country.area}</p>

            <h3>Languages:</h3>
            <ul>
                {
                    country.languages
                        ? Object.values(country.languages).map(lang =>{ 
                        return <li key={lang}>{lang}</li>;
                }) : <li>No languages listed</li>
                }
            </ul>
            <img src={country.flags.png} alt="flag" width='150' />

            {
                weather && (
                    <div>
                        <h3>Weather in {country.capital[0]}</h3>

                        <p><strong>Temperature: </strong>{weather.main.temp}°C</p>

                        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icons" />

                        <p><strong>Wind:</strong> {weather.wind.speed} meter/second</p>
                    </div>
                )
            }
        </div>
    )
}

export default CountryDetails;
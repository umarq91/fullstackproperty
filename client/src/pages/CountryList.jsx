import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryList = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Country List</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>
            <h2>{country.name.common}</h2>
            <ul>
              {Object.keys(country.divisions).map((stateCode) => (
                <li key={stateCode}>
                  <h3>{stateCode}</h3>
                  <ul>
                    {Object.values(country.divisions[stateCode]).map((city) => (
                      <li key={city}>
                        <span>{city}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;

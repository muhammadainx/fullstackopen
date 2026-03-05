const Countries = ({ countries, onShowCountry }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => onShowCountry(country)}>show details</button>
        </li>
      ))}
    </ul>
  );
};

export default Countries;

import { useState, useEffect } from "react";

import Content from "./components/Content";

import getAllCountries from "./services/countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    getAllCountries().then((allCountries) => setCountries(allCountries));
  }, []);

  const filteredCountries = query
    ? countries.filter((c) =>
        c.name.common.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setSelectedCountry(null);
  };

  return (
    <div>
      <div>
        Find Country: <input value={query} onChange={handleQueryChange} />
      </div>

      <Content
        query={query}
        filteredCountries={filteredCountries}
        selectedCountry={selectedCountry}
        handleSelectedCountry={setSelectedCountry}
      />
    </div>
  );
}

export default App;

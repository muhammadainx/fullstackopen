import Countries from "./Countries";
import Country from "./Country";

const Content = ({
  query,
  filteredCountries,
  selectedCountry,
  handleSelectedCountry,
}) => {
  if (query === "") return null;

  if (selectedCountry) {
    return <Country country={selectedCountry} />;
  }

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (filteredCountries.length > 1) {
    return (
      <Countries
        countries={filteredCountries}
        onShowCountry={handleSelectedCountry}
      />
    );
  }

  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  }

  return <p>No matches found</p>;
};

export default Content;

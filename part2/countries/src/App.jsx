import { useState } from "react";

const countries = [
  "Pakistan",
  "Finland",
  "Australia",
  "Malaysia",
  "England",
  "Qatar",
];

function App() {
  const [selected, setSelected] = useState(0);

  const handleNextCountry = () => {
    const indices = countries.map((_, i) => i).filter((i) => i !== selected);
    const newIndex = indices[Math.floor(Math.random() * indices.length)];
    setSelected(newIndex);
  };

  return (
    <>
      <div>Country: {countries[selected]}</div>
      <button onClick={handleNextCountry}>Get New Country</button>
    </>
  );
}

export default App;

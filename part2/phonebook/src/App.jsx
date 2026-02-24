import { useState } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filter, setFilter] = useState("");

  const addPerson = ({ name, number }) => {
    const trimmedName = name.trim();
    const trimmedNumber = number.trim();

    if (!trimmedName || !trimmedNumber) {
      alert(`Please enter both a name and a number`);
      return;
    }

    const alreadyExists = persons.some(
      ({ name }) => name.toLowerCase() === trimmedName.toLowerCase(),
    );

    if (alreadyExists) {
      window.alert(`${trimmedName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: trimmedName,
      number: trimmedNumber,
    };

    setPersons(persons.concat(newPerson));
    return true;
  };

  const personsToShow = filter
    ? persons.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase().trim()),
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        value={filter}
        onChange={({ target }) => setFilter(target.value)}
      />

      <PersonForm addPerson={addPerson} />

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;

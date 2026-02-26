import { useState, useEffect } from "react";
import axios from "axios";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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

      <h3>Add New Contact</h3>
      <PersonForm addPerson={addPerson} />

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;

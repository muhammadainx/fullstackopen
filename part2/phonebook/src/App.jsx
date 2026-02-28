import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const updatePerson = (name, number) => {
    const person = persons.find(
      (p) => p.name.toLowerCase() === name.toLowerCase(),
    );

    const updatedPerson = { ...person, number };

    return personService
      .update(person.id, updatedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((p) => (p.id === person.id ? returnedPerson : p)),
        );
        return true;
      });
  };

  const addPerson = ({ name: rawName, number: rawNumber }) => {
    const name = rawName.trim();
    const number = rawNumber.trim();

    if (!name || !number) {
      alert(`Please enter both a name and a number`);
      return Promise.resolve(false);
    }

    const alreadyExists = persons.some(
      (p) => p.name.toLowerCase() === name.toLowerCase(),
    );

    if (alreadyExists) {
      window.confirm(
        `${name} is already added to phonebook. Replace the old number with a new one?`,
      );
      return updatePerson(name, number);
    }

    const newPerson = { name, number };

    return personService.create(newPerson).then((returnedPerson) => {
      setPersons((prev) => prev.concat(returnedPerson));
      return true;
    });
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
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

      <Persons personsToShow={personsToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;

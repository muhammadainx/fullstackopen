import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  const notify = (message, status) => {
    setNotification({ message, status });
    setTimeout(() => setNotification(null), 5000);
  };

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
        notify(`Updated ${returnedPerson.name}`, "success");
        return true;
      })
      .catch(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
        notify(
          `${person.name} seems to have already been removed from the phonebook.`,
          "error",
        );
        return true;
      });
  };

  const addPerson = ({ name: rawName, number: rawNumber }) => {
    const name = rawName.trim();
    const number = rawNumber.trim();

    if (!name || !number) {
      notify(`Please enter both a name and a number`, "error");
      return Promise.resolve(false);
    }

    const alreadyExists = persons.some(
      (p) => p.name.toLowerCase() === name.toLowerCase(),
    );

    if (alreadyExists) {
      if (
        window.confirm(
          `${name} is already added to phonebook. Replace the old number with a new one?`,
        )
      ) {
        return updatePerson(name, number);
      }

      return Promise.resolve(false);
    }

    const newPerson = { name, number };

    return personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      notify(`${returnedPerson.name} added`, "success");
      return true;
    });
  };

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          notify(`Deleted ${person.name}`, "success");
        })
        .catch(() => {
          setPersons(persons.filter((p) => p.id !== id));
          notify(
            `${person.name} was deleted. The list has been updated`,
            "error",
          );
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

      <Notification notification={notification} />

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

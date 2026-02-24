import { useState } from "react";

const PersonForm = ({ addPerson }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const success = addPerson({ name: newName, number: newNumber });

    if (success) {
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={({ target }) => setNewName(target.value)}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={({ target }) => setNewNumber(target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;

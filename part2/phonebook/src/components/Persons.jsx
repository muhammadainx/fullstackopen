import Person from "./Person";

const Persons = ({ personsToShow, onDelete }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <Person
          key={person.id}
          person={person}
          onDelete={() => onDelete(person.id)}
        />
      ))}
    </>
  );
};

export default Persons;

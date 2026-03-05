const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (request, response) => {
  const totalEntries = persons.length;
  const time = new Date();

  response.send(`
     <p>Phonebook has info for ${totalEntries} people</p>
    <p>${time}</p>
    `);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const { id } = request.params;
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  const id = Math.floor(Math.random() * 1_000_000_000);
  return String(id);
};

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  const nameExists = persons.find((p) => p.name === name);

  if (nameExists) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const person = {
    id: generateId(),
    name,
    number,
  };

  persons.push(person);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const { id } = request.params;
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

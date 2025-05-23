// console.log("hello akash ");

const express = require("express");
const app = express();

//to handle json body, we use middleware:
app.use(express.json());

const persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
];


app.get('/api/persons', (req, res) => {
    res.json(persons);
});

//info rotue with current date and count
app.get('/info', (req, res) => { 
    const total = persons.length;
    const date = new Date();

    res.send(`<p>Phonebook has info for ${total} people </p> <p> ${date}</p>`);
})

//return person by ID
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id);

    if (person) {
        res.json(person);

    } else{
        res.status(404).send({error: 'Perosn not found'});
    }
});

//adding deltel route
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const index = persons.findIndex(p => p.id === id);

    if ( index !== -1) {
        persons.splice(index, 1);
        res.status(204).end(); //No content

    } else {
        res.status(404).json({ error: 'Person not found'});
    }
})



const PORT = 3001;
app.listen(PORT, () => { 
    console.log(`server running on port ${PORT}`);
});
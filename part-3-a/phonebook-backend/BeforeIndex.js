// console.log("hello akash ");

const express = require("express");
//EX: 3.7 add morgan middleware to ur app
const morgan = require("morgan");

const cors = require('cors');


const app = express();

//to handle json body, we use middleware:
app.use(cors()); //enable cors for all routes
app.use(express.json());

app.use(morgan("tiny")); // "tinay", "combined", "common"

app.use(express.static('dist'));

// const persons = [
//   { id: "1", name: "Arto Hellas", number: "040-123456" },
//   { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
//   { id: "3", name: "Dan Abramov", number: "12-43-234345" },
//   { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
// ];

//ex: 3.1
app.get('/api/persons', (req, res) => {
    res.json(persons);
});


//EX:3.2 info rotue with current date and count
app.get('/info', (req, res) => { 
    const total = persons.length;
    const date = new Date();

    res.send(`<p>Phonebook has info for ${total} people </p> <p> ${date}</p>`);
})

//EX:3.3 return person by ID
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id);

    if (person) {
        res.json(person);

    } else{
        res.status(404).send({error: 'Perosn not found'});
    }
});

//EX: adding deltel route
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

//EX: 3.5 adding post route
app.post('/api/persons', (req, res) => {
    const body = req.body;

    //checking ig name or number is missing 
    if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' });
  }

//EX: 3.6 so now checking if name already exists
  const nameExists = persons.some(p => p.name === body.name);
  if (nameExists) {
    //ex: 3.6
    return res.status(400).json({error: 'name must be unique'});
  }


  const newPerson ={
    id: Math.floor(Math.random() * 1000000).toString(), //random uique id
    name: body.name,
    number: body.number
  };

  persons.push(newPerson);
  res.status(201).json(newPerson);
})

// const PORT = 3001;
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { 
    console.log(`server running on port ${PORT}`);
});
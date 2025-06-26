const express = require("express");
//EX: 3.7 add morgan middleware to ur app
const morgan = require("morgan");
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery',false)

mongoose.connect(url);

app.use(cors()); 
app.use(express.json());

app.use(morgan("tiny")); // "tinay", "combined", "common"

app.use(express.static('dist'));

const requestLogger = (request, response, next) =>{
  console.log("Method:", request.method);
  console.log("Path:", request.path);
  console.log("Body:", request.body);
  console.log("---");
  next();
}
app.use(requestLogger);

// const persons = [
//   { id: "1", name: "Arto Hellas", number: "040-123456" },
//   { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
//   { id: "3", name: "Dan Abramov", number: "12-43-234345" },
//   { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
// ];

//let's start from here  and use mongoose built- validation in our personSchema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    required: true
  } 
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model('Person', personSchema);


//for mongodb 

//ex: 3.1
//ex: 3.18 inspected individual phonebook entry from the browser 
app.get('/api/persons', (req, res) => {
    // res.json(persons);
    Person.find({}).then(persons => {
      res.json(persons);
    })
    .catch(error => {
      console.log(error);
      response.status(500).send({ error: 'failed to fetch persons'});
    });
});

//for mongo
//EX:3.2 info rotue with current date and count
//ex: 3.18 inspected individual phonebook entry from the browser 
app.get('/info', async (request, response) => { 
  //local array ko 
    // const total = persons.length;
    // const date = new Date();
    // res.send(`<p>Phonebook has info for ${total} people </p> <p> ${date}</p>`);
    try{
      const total = await Person.countDocuments({});
      const date = new Date();
      response.send(`<p>Phonebook has info for ${total} people</p><p>${date}</p>`);
    } catch (err){
        response.status(500).send({ error: "Failed to count documents:"});
    }
});

//for mongodb
//EX:3.3 return person by ID
app.get('/api/persons/:id', (request, response) => {
    // const id = req.params.id;
    // const person = persons.find(p => p.id === id);

    // if (person) {
    //     res.json(person);

    // } else{
    //     res.status(404).send({error: 'Perosn not found'});
    // }
    const id = request.params.id;

    Person.findById(id).then(person => {
      if (person){
        response.json(person);
      } else {
        response.status(404).send({ error: 'Person not found'});
      }
    }).catch(error => { 
      // console.log(error);
      // response.status(400).send({ error: 'malformatted id'})
      //moving /passing the error forward with the next function 
      //next function is passed to the handler as the third parameter.
      next(error); //this willg goto your error handler middlerware
    })
});

//mongodb
//EX: adding deltel route
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    // const index = persons.findIndex(p => p.id === id);

    // if ( index !== -1) {
    //     persons.splice(index, 1);
    //     res.status(204).end(); //No content

    // } else {
    //     res.status(404).json({ error: 'Person not found'});
    // }
    Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end();   // success: no content
    })
    .catch(error =>{
      next(error);  // this will call your error middleware if id is wrong 
    })
})

//monogdb

//EX: 3.5 adding post route
app.post('/api/persons', (request, response, next) => {
    const body = request.body;

    //checking ig name or number is missing 
    if (!body.name || !body.number) {
    return response.status(400).json({ error: 'name or number missing' });
  }

  //checking if name already exists in the database 
  Person.findOne({ name: body.name })
  .then(existingPerson => {
    if (existingPerson) { 
      return response.status(400).json({ error: 'name must be unique'});
    } 
    const newPerson = new Person({
      name: body.name,
      number: body.number
    });
    
    return newPerson.save(); //save to mongoDB
  })
  .then(savedPerson => {
    if(savedPerson){
      response.status(201).json(savedPerson);  //send saved person back
    }
  })
  .catch(error => next(error)); //catch DB errors

// //EX: 3.6 so now checking if name already exists
//   const nameExists = persons.some(p => p.name === body.name);
//   if (nameExists) {
//     //ex: 3.6
//     return res.status(400).json({error: 'name must be unique'});
//   }


//   const newPerson ={
//     id: Math.floor(Math.random() * 1000000).toString(), //random uique id
//     name: body.name,
//     number: body.number
//   };

//   persons.push(newPerson);
//   res.status(201).json(newPerson);

});
//func modify backend to support this put request

//func to update single note ,
app.put('/api/persons/:id', (request, response, next) =>{
  const {name, number} = request.body;

  Person.findByIdAndUpdate(request.params.id)
  .then(person => {
    if (!person) {
      return response.status(404).send({ error: 'Person not found'})
    }

    person.name = name
    person.number = number

    return person.save();
  })    //nested promises, within the outer .then method, another promised chain is defined:
  .then((updatedPerson) => { 
      if(updatedPerson){
           response.json(updatedPerson)
        }
  })
  .catch(error => next(error))
});


//we are writing our own code 
app.use((request, response, next) => { 
    response.status(404).send("no code available to handle this request");
    // next();
})


//expressing error handlers are middleware that are defined with function that accepts four parameters.
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError'){ 
    return response.status(400).json({ error: error.message });
  }

  next(error)
}
//this has  to be the last loaded middlware , also all the routes should be registered before this!
app.use(errorHandler);

// const PORT = 3001;
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => { 
//     console.log(`server running on port ${PORT}`);
// });


app.listen(process.env.PORT);

console.log(`Server running on port ${process.env.PORT}`);
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2];

const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://tolangeakash753:${password}@cluster0.a73zqgg.mongodb.net?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url).then(()=>{
  console.log("Mongodb connected successfully")
})


const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if ( process.argv.length == 3){
  //if only password is given -> show all phonebook entries
  Person.find({}).then(result =>{ 
    console.log('phonebook:');
    result.forEach(person => {
      console.log( `${person.name} ${person.number}`);
      });
      mongoose.connection.close();
  });
} else if (process.argv.length === 5){
  //if password + name + number is given -> add new entry
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  })


// const person = new Person({
//   name: name,
//   number: number,
// })

person.save().then(result => {
  console.log(`added ${name} number ${number} to phonebook`);
  mongoose.connection.close()
});

} else {
  console.log('usage: node mongo.js <password> [<name> <number>]');
  mongoose.connection.close();
}
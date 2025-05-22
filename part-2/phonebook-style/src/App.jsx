import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  //create state to hold msg and i's type
  const [notification, setNotification] = useState({ message: null, type: '' });

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  //ADDPERSON
  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added. Replace the old number with the new one?`
      )
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService.update(existingPerson.id, updatedPerson)
          .then(response => {
            setPersons(persons.map(p =>
              p.id !== existingPerson.id ? p : response.data
            ))
            setNewName('');
            setNewNumber('');

            //FOR SUCCESS NOTIFICATION FOR UPDATE OK
            setNotification({ 
              message:  `updated ${response.data.name}'s number`,
              type: 'success'
            });
            //
            setTimeout(() => {
              setNotification({ message: null, type: '' });
            }, 5000);
            
          })
            // .catch(error => { 
            //   //yade already deleted xa vane eroror notification if update fails

            //   //this way we can handle and 
            //   if( error.response && error.response.status === 404 ) {
            //   setNotification( { 
            //     message: `Information of ${existingPerson.name} has already been removed from server`,
            //     type: 'error'
            //   });
            //   setTimeout(() => {
            //     setNotification({ message: null, type: ''});
            //   }, 5000);

            //   //Remove deleted person from UI ok
            //   setPersons(persons.filter(p => p.id !== existingPerson.id));

            //  } else{
            //   // for errors , you can log or handle differently if needed
            //   console.log(error);
            //  }

            // });

        return
      }
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    //here creating new entry
    personService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')

        //success notification for add
        setNotification({ 
          message:  `Added ${response.data.name}`,
          type: 'success'
        })
        setTimeout(() => {
          setNotification( { message: null, type: '' });
        }, 5000)
      })
  }

  //DELETEPERSON
  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const confirmDelete = window.confirm(`Delete ${person.name}?`)

    if (confirmDelete) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  //FILTER

  const filtered = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      
      {/* here  */}
      <Notification notification={notification}/>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={filtered} deletePerson={deletePerson} />
    </div>
  )
}

export default App

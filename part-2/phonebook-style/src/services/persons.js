import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

//to use get method to read
const getAll = () => axios.get(baseUrl);

const create = newPerson => axios.post(baseUrl, newPerson);

//to use put method to update
const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject);

//to use delete method to remove
const remove = id => axios.delete(`${baseUrl}/${id}`);

export default { getAll, create, update, remove };

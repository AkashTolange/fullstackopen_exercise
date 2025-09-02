import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'


//getAll
export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}


//createNew
export const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

//update
const update = async (id, updated) => {
  const { data } = await axios.put(`${baseUrl}/${id}`, updated)
  return data
}

export default { update } 
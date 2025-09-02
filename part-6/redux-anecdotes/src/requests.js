import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

export const createAnecdote = async (newAnecdote) => {
  const { data } = await axios.post(baseUrl, newAnecdote)
  return data
}

export const updateAnecdote = async (anecdote) => {
  const { data } = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return data
}

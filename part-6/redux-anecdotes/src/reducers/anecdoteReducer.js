import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const updated = action.payload
      return state.map(a => a.id === updated.id ? updated : a)
    },
  },
})

export const { setAnecdotes, appendAnecdote, updateAnecdote } = anecdoteSlice.actions

// thunks
export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(setAnecdotes(anecdotes))
}

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.createNew(content)
  dispatch(appendAnecdote(newAnecdote))
}

export const voteAnecdote = (anecdote) => async (dispatch) => {
  const toSave = { ...anecdote, votes: anecdote.votes + 1 }
  const saved = await anecdoteService.update(toSave.id, toSave)
  dispatch(updateAnecdote(saved))
}

export default anecdoteSlice.reducer

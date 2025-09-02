// reducers/anecdoteReducer.js
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'  // we'll create this service file

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // set anecdotes when initializing
    setAnecdotes(state, action) {
      return action.payload
    },
    // add a new anecdote
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    // vote for an anecdote
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1
      }
    }
  }
})

export const { setAnecdotes, appendAnecdote, voteAnecdote } = anecdoteSlice.actions

// === Thunks ===

// fetch anecdotes from backend
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// create new anecdote in backend
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer

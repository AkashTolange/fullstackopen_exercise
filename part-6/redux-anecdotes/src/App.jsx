import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'
import { useRef } from 'react'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  //told yeah 
  const inputRef = useRef()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  //ex:6.4
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = inputRef.current.value
    if (content) {
      dispatch(createAnecdote(content))
      inputRef.current.value = '' // clear input
    }
  }

  return (
    <div>
      <h2>Anecdotes</h2>

      {/* to make anecdotes ordered by number of votes, modify the rendering in this  */}
      {[...anecdotes]
      .sort((a,b) => b.votes - a.votes)         //sort descednign by votes
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      {/* from here */}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input ref={inputRef}/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
// import { useSelector, useDispatch } from 'react-redux'
// import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'
// import { useRef } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  // const anecdotes = useSelector(state => state)
  // const dispatch = useDispatch()
  //told yeah 
  // const inputRef = useRef()

  // const vote = (id) => {
  //   console.log('vote', id)
  //   dispatch(voteAnecdote(id))
  // }

  //ex:6.4
  // const addAnecdote = (event) => {
  //   event.preventDefault()
  //   const content = inputRef.current.value
  //   if (content) {
  //     dispatch(createAnecdote(content))
  //     inputRef.current.value = '' // clear input
  //   }
  // }

  //for 6.14. to 15 part
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>

      {/* to make anecdotes ordered by number of votes, modify the rendering in this  */}
      {/* {[...anecdotes]
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
      )} */}
      <Filter/>
      <AnecdoteList/>
      {/* from here */}
      {/* <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input ref={inputRef}/></div>
        <button type='submit'>create</button>
      </form> */}
      <AnecdoteForm/>
    </div>
  )
}

export default App
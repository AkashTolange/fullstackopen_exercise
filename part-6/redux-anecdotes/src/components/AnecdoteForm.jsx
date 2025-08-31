import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useRef } from 'react'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const inputRef = useRef()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = inputRef.current.value
    if (content) {
      dispatch(createAnecdote(content))
      inputRef.current.value = ''
    }
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input ref={inputRef} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

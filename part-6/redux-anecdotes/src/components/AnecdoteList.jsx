import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const filtered = filter
      ? anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
      : anecdotes
    return [...filtered].sort((a, b) => b.votes - a.votes)
  })

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }

  return (
    <>
      {anecdotes.map(a => (
        <div key={a.id}>
          <div>{a.content}</div>
          <div>
            has {a.votes} <button onClick={() => handleVote(a)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList

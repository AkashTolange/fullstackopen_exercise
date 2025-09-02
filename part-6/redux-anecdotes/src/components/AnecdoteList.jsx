import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote } from '../requests'
import { useNotification } from '../context/NotificationContext'


//Ex: voting using useMutation and cache updates

//this anecdotes is undefined , eslint wants you to tell what type of props it is ,  
//whether it is array, object or ..., if it is not , eslint will validate it , if it is not type given then it will say it is undefined or the wrong type
//it's best practise warning  and you can disable it 
const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient()

  //same here too 
  const { setNotification } = useNotification();

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      // update cache
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
      )
      setNotification(`You voted for "${updateAnecdote.content}"`);
    },
    onError: (error) =>{ 
      setNotification(`Error: ${error.message}`)
    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotification } from '../context/NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  //perfect 
  const { setNotification } = useNotification();


  //FORGOT TO MENTION useMutation , as we create anecdotes using useMutation
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      // update cache so UI updates instantly
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      setNotification(`Anecdote "${newAnecdote.content}", added successfully`)
    },
    onError: (error) => { 
      setNotification( `Error: ${error.message}`);
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    //input clear vayo yaha
    event.target.anecdote.value = ''
    if (content.length < 5) {
      // alert('anecdote must be at least 5 characters')
      setNotification('Error: anecdote must be at least 5 characters')
      return
    }
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

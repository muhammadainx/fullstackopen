import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createAnecdote } from '../requests'
import { useNotification } from '../hooks/useNotification'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const { setNotification } = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (old = []) =>
        old.concat(newAnecdote),
      )

      setNotification(`You created "${newAnecdote.content}"`)
    },
    onError: () => {
      setNotification('anecdote must be at least 5 characters long')
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
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

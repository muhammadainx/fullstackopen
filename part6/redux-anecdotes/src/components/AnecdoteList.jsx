import { useDispatch, useSelector } from "react-redux";

import { voteFor } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (!filter) return anecdotes;

    return anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase()),
    );
  });

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const handleVote = (anecdote) => {
    dispatch(voteFor(anecdote));
    dispatch(setNotification(`You voted "${anecdote.content}"`, 5));
  };

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;

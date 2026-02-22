import { useState } from "react";

const Header = ({ title }) => <h2>{title}</h2>;

const Anecdote = ({ text, voteCount }) => (
  <div>
    <p>{text}</p>
    <p>{voteCount}</p>
  </div>
);

const MostVotedAnecdote = ({ anecdotes, votes }) => {
  const highestVoteCount = Math.max(...votes);
  const topAnecdoteIndex = votes.indexOf(highestVoteCount);

  if (highestVoteCount === 0) return <p>No votes yet. Be the first to vote!</p>;

  return (
    <div>
      <p>{anecdotes[topAnecdoteIndex]}</p>
      <p>has {highestVoteCount} votes</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(() => Array(anecdotes.length).fill(0));

  const handleVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;

    setVotes(updatedVotes);
  };

  const handleNextAnecdote = () => {
    const indices = anecdotes.map((_, i) => i).filter((i) => i !== selected);
    const newIndex = indices[Math.floor(Math.random() * indices.length)];

    setSelected(newIndex);
  };

  return (
    <div>
      <Header title="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} voteCount={votes[selected]} />
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNextAnecdote}>Next anecdote</button>
      <Header title="Anecdote with most votes" />
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

export default App;

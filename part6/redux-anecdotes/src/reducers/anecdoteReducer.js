import { createSlice } from "@reduxjs/toolkit";

import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      const id = action.payload.id;
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : action.payload,
      );
    },
  },
});

const { setAnecdotes, createAnecdote, voteAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const voteFor = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const returnedAnecdote = await anecdoteService.update(updatedAnecdote);
    dispatch(voteAnecdote(returnedAnecdote));
  };
};

export default anecdoteSlice.reducer;

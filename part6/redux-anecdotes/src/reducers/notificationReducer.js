import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
});

const { showNotification, clearNotification } = notificationSlice.actions;

let timeoutId;

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(showNotification(message));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;

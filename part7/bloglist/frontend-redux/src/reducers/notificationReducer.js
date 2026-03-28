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

export const setNotification = ({
  message,
  status = "success",
  duration = 5,
}) => {
  return (dispatch) => {
    dispatch(showNotification({ message, status }));

    clearTimeout(timeoutId);

    timeoutId = setTimeout(
      () => dispatch(clearNotification()),
      1000 * duration,
    );
  };
};

export default notificationSlice.reducer;

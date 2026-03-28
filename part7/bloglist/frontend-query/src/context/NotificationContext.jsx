import { createContext, useReducer, useRef } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  );

  const timeoutId = useRef(null);

  const setNotification = ({ message, status = 'success', duration = 5 }) => {
    if (!message) return null;

    clearTimeout(timeoutId.current);

    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: { message, status },
    });

    timeoutId.current = setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 1000 * duration);
  };

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

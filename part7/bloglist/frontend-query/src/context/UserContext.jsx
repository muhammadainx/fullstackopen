import { createContext, useEffect, useReducer } from 'react';

import blogService from '../services/blogs';

const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case CLEAR_USER:
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      userDispatch({ type: SET_USER, payload: user });
    }
  }, []);

  const loginUser = (user) => {
    window.localStorage.setItem('loggedUser', JSON.stringify(user));
    blogService.setToken(user.token);
    userDispatch({ type: SET_USER, payload: user });
  };

  const logoutUser = () => {
    window.localStorage.removeItem('loggedUser');
    blogService.setToken(null);
    userDispatch({ type: CLEAR_USER });
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

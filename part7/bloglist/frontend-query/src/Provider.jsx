import { NotificationContextProvider } from './context/NotificationContext';
import { UserContextProvider } from './context/UserContext';

const Provider = ({ children }) => {
  return (
    <NotificationContextProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </NotificationContextProvider>
  );
};

export default Provider;

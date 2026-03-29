import { useUser } from '../hooks/useUser';

import Login from '../pages/Login';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  return user ? children : <Login />;
};

export default ProtectedRoute;

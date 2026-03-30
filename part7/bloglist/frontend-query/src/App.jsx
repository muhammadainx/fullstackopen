import { Route, Routes } from 'react-router';
import Container from '@mui/material/Container';

import Blogs from './pages/Blogs';
import Blog from './pages/Blog';
import Users from './pages/Users';
import User from './pages/User';
import Login from './pages/Login';

import Navbar from './components/Navbar';
import Notification from './components/Notification';
import ProtectedRoute from './components/ProtectedRoute';

import { useUser } from './hooks/useUser';

const App = () => {
  const { user } = useUser();

  return (
    <Container>
      <Notification />

      {user && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Blogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<h3>404 Page Not Found</h3>} />
      </Routes>
    </Container>
  );
};

export default App;

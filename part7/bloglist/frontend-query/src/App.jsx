import { Route, Routes } from 'react-router';

import Blogs from './pages/Blogs';
import Blog from './pages/Blog';
import Users from './pages/Users';
import User from './pages/User';
import Login from './pages/Login';

import Navbar from './components/Navbar';
import Notification from './components/Notification';

import { useUser } from './hooks/useUser';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const { user } = useUser();

  return (
    <div>
      <Notification />

      {user && (
        <>
          <Navbar />
          <h2>Blog App</h2>
        </>
      )}

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
    </div>
  );
};

export default App;

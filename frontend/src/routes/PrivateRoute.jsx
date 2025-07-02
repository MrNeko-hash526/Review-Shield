// src/routes/PrivateRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>; // Wait for user to load

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

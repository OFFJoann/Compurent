// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Verifica si hay un token de autenticación

  if (!isAuthenticated) {
    // Si no está autenticado, redirige al login
    return <Navigate to="/" />;
  }

  // Si está autenticado, muestra el componente hijo
  return children;
};

export default ProtectedRoute;

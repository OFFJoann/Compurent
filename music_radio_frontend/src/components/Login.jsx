import React, { useState } from 'react';

const Login = () => {
  const [numIdentificacion, setNumIdentificacion] = useState(''); // Captura el número de identificación
  const [contraseña, setContraseña] = useState(''); // Captura la contraseña
  const [error, setError] = useState(''); // Maneja los errores

  const handleLogin = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ num_identificacion: numIdentificacion, contraseña: contraseña }) // Alinea con las claves del backend
      });

      if (!response.ok) {
        const errorData = await response.json(); // Parseamos el error para mostrar el detalle
        throw new Error(errorData.detail || 'Error en el inicio de sesión');
      }
      
      const data = await response.json(); // Recibe la respuesta del backend
      alert(data.message);  // Muestra mensaje de éxito al usuario
    } catch (err) {
      setError(err.message); // Muestra el mensaje de error si ocurre algún problema
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Número de Identificación</label>
          <input
            type="text"
            value={numIdentificacion}
            onChange={(e) => setNumIdentificacion(e.target.value)} // Actualiza el estado con el número de identificación
            maxLength="15"
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)} // Actualiza el estado con la contraseña
            maxLength="20"
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el error en rojo si existe */}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;

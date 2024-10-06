import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [numIdentificacion, setNumIdentificacion] = useState(''); 
  const [contraseña, setContraseña] = useState(''); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ num_identificacion: numIdentificacion, contraseña: contraseña })
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 404) {
          setError('Usuario no registrado');
        } else {
          throw new Error(errorData.detail || 'Error en el inicio de sesión');
        }
      } else {
        const data = await response.json();
        localStorage.setItem('authToken', data.token); 
        localStorage.setItem('username', data.username);
        navigate('/Catalog');
      }
    } catch (err) {
      setError(err.message); 
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Music Radio Inc</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="login-form-group">
          <label htmlFor="numIdentificacion" className="login-label">Número de Identificación</label>
          <input
            id="numIdentificacion"
            className="login-input"
            type="tel"
            value={numIdentificacion}
            onChange={(e) => setNumIdentificacion(e.target.value)}
            maxLength="15"
            required
            autoComplete='off'
            onInput={(e) => {e.target.value = e.target.value.replace(/\D/g, ''); }} 
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="contraseña" className="login-label">Contraseña</label>
          <input
            id="contraseña"
            className="login-input"
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            maxLength="20"
            required
            autoComplete='off'
          />
        </div>
        {error && <p className="login-error">{error}</p>}
        <button className="login-submit" type="submit">Iniciar sesión</button>
      </form>
      <a className="login-register-link" href="/Register">Registrarme</a>
    </div>
  );
};

export default Login;

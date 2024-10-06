import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirigir
import '../styles/Catalog.css'; // Importamos el CSS del componente
import feidImg from '../styles/images/feid.jpg'; 
import badbunnyImg from '../styles/images/badbunny.jpg'; 
import shakiraImg from '../styles/images/shakira.jpg'; 

const Catalog = () => {
  const navigate = useNavigate(); // Usar useNavigate para redirigir

  // Lista de álbums con su nombre e imagen
  const albums = [
    {
      id: 1,
      name: 'FEID',
      image: feidImg,
    },
    {
      id: 2,
      name: 'BAD BUNNY',
      image: badbunnyImg,
    },
    {
      id: 3,
      name: 'SHAKIRA',
      image: shakiraImg,
    },
  ];

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Eliminar el token de autenticación
    localStorage.removeItem('username'); // Eliminar el nombre de usuario
    navigate('/'); // Redirigir al login
  };

  return (
    <div className="catalog-container">
      <header>
        <h1>¡¡¡Bienvenido a Music Radio Inc...!!!</h1>
        <button onClick={handleLogout} className="logout-button">Salir</button>
      </header>
      <div className="albums">
        {albums.map((album) => (
          <div key={album.id} className="album-card">
            <img src={album.image} alt={album.name} className="album-image" />
            <h3 className="album-name">{album.name}</h3>
            <button className="buy-button">Comprar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;

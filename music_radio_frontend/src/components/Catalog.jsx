import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Catalog.css'; 
import feidImg from '../styles/images/feid.jpg'; 
import badbunnyImg from '../styles/images/badbunny.jpg'; 
import shakiraImg from '../styles/images/shakira.jpg'; 


const Catalog = () => {
  const navigate = useNavigate(); 

  // Lista de álbums
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

  // Maneja el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    localStorage.removeItem('username'); 
    navigate('/'); 
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

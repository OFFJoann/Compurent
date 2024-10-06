import React, { useState } from 'react';
import Usercreated from './Usercreated';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'

function RegistroUsuario() {
  const [formData, setFormData] = useState({
    num_identificacion: '',
    nombre: '',
    correo: '',
    contraseña: '',
    direccion: '',
    ciudad: '',
    telefono: ''
  });

  const [modalMessage, setModalMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        setModalMessage('Usuario registrado correctamente');
        setTimeout(() => {
          navigate('/');
        }, 6000);
        console.log(result)
      } else if (response.status === 403) {
        setModalMessage('El usuario ya existe');
      } else {
        setModalMessage('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      setModalMessage('Error en la conexión con la API');
    }
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setModalMessage(null);
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Numero de identificacion:
          <input type="tel" onInput={(e) => {e.target.value = e.target.value.replace(/\D/g, ''); }} name="num_identificacion" value={formData.num_identificacion} onChange={handleChange} required maxLength="15" autoComplete='off' />
        </label>
        <br />
        <label>
          Contraseña:
          <input type="password" name="contraseña" value={formData.contraseña} onChange={handleChange} required maxLength="20" autoComplete='off'/>
        </label>
        <br />
        <label>
          Nombre:
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required maxLength="50" autoComplete='off' />
        </label>
        <br />
        <label>
          Correo:
          <input type="email" name="correo" value={formData.correo} onChange={handleChange} required maxLength="50" autoComplete='off' />
        </label>
        <br />
        <label>
          Dirección:
          <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required maxLength="300" autoComplete='off'/>
        </label>
        <br />
        <label>
          Ciudad:
          <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} maxLength="20"  autoComplete='off' />
        </label>
        <br />
        <label>
          Teléfono:
          <input type="tel" onInput={(e) => {e.target.value = e.target.value.replace(/\D/g, ''); }}  name="telefono" value={formData.telefono} onChange={handleChange} placeholder='(+57)' maxLength="20"  autoComplete='off'/>
        </label>
        <br />
        <button type="submit">Registrarme</button>
      </form>

      {/* Mostrar el componente Usercreated si hay un mensaje en modalMessage */}
      {modalMessage && <Usercreated onClose={handleCloseModal} message={modalMessage} />}
    </div>
  );
}

export default RegistroUsuario;

import React, { useState } from 'react';

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realizamos la petición a la API de FastAPI
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
        alert('Usuario registrado correctamente: ' + JSON.stringify(result));
      } else {
        alert('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error en la conexión con la API');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Numero de identificacion:
        <input type="text" name="num_identificacion" value={formData.num_identificacion} onChange={handleChange} />
      </label>
      <br />
      <label>
        Nombre:
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
      </label>
      <br />
      <label>
        Correo:
        <input type="email" name="correo" value={formData.correo} onChange={handleChange} />
      </label>
      <br />
      <label>
        Contraseña:
        <input type="password" name="contraseña" value={formData.contraseña} onChange={handleChange} />
      </label>
      <br />
      <label>
        Dirección:
        <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
      </label>
      <br />
      <label>
        Ciudad:
        <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} />
      </label>
      <br />
      <label>
        Teléfono:
        <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Registrar</button>
    </form>
  );
}

export default RegistroUsuario;
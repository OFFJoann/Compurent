from pydantic import BaseModel, EmailStr, constr

# Definición del modelo 'User' que representa a un usuario
class User(BaseModel):
    # Número de identificación con un máximo de 15 caracteres
    num_identificacion: constr(max_length=15)
    # Nombre del usuario con un máximo de 50 caracteres
    nombre: constr(max_length=50)
    # Correo electrónico con un máximo de 50 caracteres
    correo: constr(max_length=50)
    # Contraseña con un máximo de 20 caracteres
    contraseña: constr(max_length=20)
    # Dirección del usuario con un máximo de 300 caracteres
    direccion: constr(max_length=300)
    # Ciudad con un máximo de 20 caracteres
    ciudad: constr(max_length=20)
    # Teléfono con un máximo de 20 caracteres
    telefono: constr(max_length=20)

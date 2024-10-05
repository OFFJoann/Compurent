from pydantic import BaseModel, EmailStr, constr


class Usuario(BaseModel):
    num_identificacion: constr(max_length=15)
    nombre: constr(max_length=50)
    correo: EmailStr
    contraseña: constr(max_length=20)
    direccion: constr(max_length=300)
    cuidad: constr(max_length=20) = None
    telefono: constr(max_length=20) = None



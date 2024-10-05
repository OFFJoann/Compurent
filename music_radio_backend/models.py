from pydantic import BaseModel, EmailStr, constr


class User(BaseModel):
    num_identificacion: constr(max_length=15)
    nombre: constr(max_length=50)
    correo: EmailStr
    contraseña: constr(max_length=20)
    direccion: constr(max_length=300)
    ciudad: constr(max_length=20)
    telefono: constr(max_length=20)



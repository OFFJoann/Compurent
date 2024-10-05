from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from models import User
from utils import leer_usuarios, guardar_usuarios
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir cualquier origen (solo para pruebas)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo para recibir los datos del login
class LoginRequest(BaseModel):
    num_identificacion: str
    contraseña: str

# Ruta para obtener la lista de usuarios
@app.get("/api/users", response_model=list[User])
def obtener_usuarios():
    return leer_usuarios()

# Ruta para registrar un nuevo usuario
@app.post("/api/register", status_code=201)
def registrar_usuario(user: User):
    usuarios = leer_usuarios()
    
    # Verificar si el usuario ya está registrado
    for u in usuarios:
        if u.num_identificacion == user.num_identificacion:
            raise HTTPException(status_code=403, detail="El usuario ya está registrado.")
    
    # Agregar nuevo usuario
    usuarios.append(user)
    guardar_usuarios(usuarios)
    
    return {"message": "Usuario registrado exitosamente"}

# Ruta para iniciar sesión
@app.post("/api/login")
def iniciar_sesion(login: LoginRequest):
    usuarios = leer_usuarios()

    for user in usuarios:
        if user.num_identificacion == login.num_identificacion:
            # Verificar la contraseña
            if user.contraseña == login.contraseña:
                return {"message": "Inicio de sesión exitoso"}
            else:
                raise HTTPException(status_code=400, detail="Contraseña incorrecta")

    # Si el usuario no existe
    raise HTTPException(status_code=404, detail="Usuario no encontrado")

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from models import User
from utils import leer_usuarios, guardar_usuarios
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuración básica de CORS para permitir acceso desde cualquier origen
# (esto está así por ahora para pruebas, habría que limitarlo en producción)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo que usamos para recibir los datos del login
class LoginRequest(BaseModel):
    num_identificacion: str
    contraseña: str

# Endpoint para obtener la lista de usuarios (devuelve todos los usuarios que tenemos)
@app.get("/api/users", response_model=list[User])
def obtener_usuarios():
    return leer_usuarios()

# Endpoint para registrar un nuevo usuario
@app.post("/api/register", status_code=201)
def registrar_usuario(user: User):
    usuarios = leer_usuarios()
    
    # Verificar si el usuario ya está registrado
    for u in usuarios:
        if u.num_identificacion == user.num_identificacion:
            raise HTTPException(status_code=403, detail="El usuario ya está registrado.")
    
    # Si no está registrado, lo agregamos y guardamos los cambios
    usuarios.append(user)
    guardar_usuarios(usuarios)
    
    return {"message": "Usuario registrado exitosamente"}

# Endpoint para iniciar sesión
@app.post("/api/login")
def iniciar_sesion(login: LoginRequest):
    usuarios = leer_usuarios()

    # Buscar al usuario en la lista de usuarios
    for user in usuarios:
        if user.num_identificacion == login.num_identificacion:
            # Si el usuario existe, verificamos la contraseña
            if user.contraseña == login.contraseña:
                return {"message": "Inicio de sesión exitoso"}
            else:
                # Contraseña incorrecta
                raise HTTPException(status_code=400, detail="Contraseña incorrecta")

    # Si no encontramos al usuario
    raise HTTPException(status_code=404, detail="Usuario no encontrado")

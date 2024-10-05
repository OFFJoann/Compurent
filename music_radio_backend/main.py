from fastapi import FastAPI, HTTPException
from models import User
from utils import leer_usuarios, guardar_usuarios

app = FastAPI()

# En esta ruta obtenemos toda la lista de usuarios
@app.get("/api/users", response_model=list[User])
def obtener_usuarios():
    return leer_usuarios()

# En esta ruta registramos todos los usuarios
@app.post("/api/register", status_code=201)
def registrar_usuario(user: User):
    usuarios = leer_usuarios()
    
    # Con este ciclo verificamos si el usuario ya está registrado si es asi devuelve un estado 400 y un mensaje
    for u in usuarios:
        if u.num_identificacion == user.num_identificacion:
            raise HTTPException(status_code=400, detail="El usuario ya está registrado.")
    
    # Agregar un nuevo usuario
    usuarios.append(user)
    guardar_usuarios(usuarios)
    
    return {"message": "Usuario registrado exitosamente"}

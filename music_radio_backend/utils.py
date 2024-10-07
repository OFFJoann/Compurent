import json
from typing import List
from models import User
from fastapi import HTTPException

# Función para leer usuarios desde un archivo JSON
def leer_usuarios() -> list[User]:
    try:
        # Abre el archivo 'users.json' en modo lectura
        with open('users.json', 'r') as f:
            # Carga y devuelve una lista de usuarios como objetos User
            return [User(**user) for user in json.load(f)]
    except FileNotFoundError:
        # Si el archivo no existe, devuelve una lista vacía
        return []

# Función para guardar usuarios en un archivo JSON
def guardar_usuarios(usuarios: list[User]):
    # Abre el archivo 'users.json' en modo escritura
    with open('users.json', 'w') as f:
        # Convierte los objetos User a diccionarios y los guarda en el archivo
        json.dump([user.dict() for user in usuarios], f, indent=4)

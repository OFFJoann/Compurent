import json
from typing import List
from models import User
from fastapi import HTTPException

def leer_usuarios() -> list[User]:
    try:
        with open('users.json', 'r') as f:
            return [User(**user) for user in json.load(f)]
    except FileNotFoundError:
        return[]
        
# Guardar usuarios en JSON (users.json)
def guardar_usuarios(usuarios: list[User]):
    with open('users.json', 'w') as f:
        json.dump([user.dict() for user in usuarios], f, indent=4)

        
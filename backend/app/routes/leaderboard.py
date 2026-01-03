from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.leaderboard_schemas import LeaderboardEntry, LeaderboardResponse
from app.services.database import save_leaderboard_entry, get_leaderboard

router = APIRouter(
    prefix="/leaderboard",
    tags=["leaderboard"]
)

@router.get("/{mode}", response_model=List[LeaderboardResponse])
async def get_leaderboard_by_mode(mode: str):
    """
    Obtener el top 10 del leaderboard según el modo
    """
    if mode not in ["normal", "imposible"]:
        raise HTTPException(status_code=400, detail="Modo debe ser 'normal' o 'imposible'")
    
    try:
        entries = await get_leaderboard(mode, limit=10)
        return entries
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error obteniendo leaderboard: {str(e)}")

@router.post("/", status_code=201)
async def save_score(entry: LeaderboardEntry):
    """
    Guardar puntuación en el leaderboard
    """
    try:
        result = await save_leaderboard_entry(
            player_name=entry.player_name,
            score=entry.score,
            mode=entry.mode
        )
        return {"message": "Puntuación guardada exitosamente", "id": str(result)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error guardando puntuación: {str(e)}")
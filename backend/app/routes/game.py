from fastapi import APIRouter, HTTPException
from app.schemas.game_schemas import PlayRequest, PlayResponse
from app.services.game_logic import GameLogic

router = APIRouter(
    prefix="/game",
    tags=["game"]
)

@router.post("/play", response_model=PlayResponse)
async def play_round(request: PlayRequest):
    """
    Realizar una jugada contra la computadora
    """
    try:
        # Obtener jugada de la CPU según el modo
        if request.mode == "normal":
            cpu_move = GameLogic.get_cpu_move_normal()
        else:  # imposible
            cpu_move = GameLogic.get_cpu_move_imposible(request.player_move)
        
        # Evaluar resultado
        result = GameLogic.evaluate_round(request.player_move, cpu_move)
        
        return PlayResponse(
            cpu_move=cpu_move,
            result=result
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en el juego: {str(e)}")
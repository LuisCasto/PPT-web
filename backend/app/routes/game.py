"""
routes/game.py — Refactorizado
Usa GameLogicProxy (Proxy) para validar y delegar la lógica,
y GameManager (Singleton) para actualizar el estado global de la partida.
El endpoint ya no mezcla validación + lógica + HTTP: aplica SRP.
"""

from fastapi import APIRouter, HTTPException, Request
from app.schemas.game_schemas import PlayRequest, PlayResponse
from app.services.game_logic_proxy import GameLogicProxy
from app.services.game_manager import GameManager
from app.middleware.rate_limiter import limiter
from app.config import settings

router = APIRouter(prefix="/game", tags=["game"])

# Instancias de los patrones
_proxy = GameLogicProxy()
_manager = GameManager()  # Singleton: siempre la misma instancia


@router.post("/play", response_model=PlayResponse)
@limiter.limit(f"{settings.MAX_GAME_PLAYS_PER_MINUTE}/minute")
async def play_round(request: Request, play_request: PlayRequest):
    """
    Realizar una jugada contra la computadora.

    Flujo:
      1. GameLogicProxy valida los parámetros (Proxy).
      2. GameLogicProxy obtiene la jugada de la CPU.
      3. GameLogicProxy evalúa el resultado.
      4. GameManager actualiza el estado global (Singleton + notifica Observer).

    Rate limit: 30 jugadas por minuto por IP.
    """
    try:
        # 1. Proxy: obtener jugada de la CPU (incluye validación de modo)
        cpu_move = _proxy.get_cpu_move(play_request.mode, play_request.player_move)

        # 2. Proxy: evaluar resultado (incluye validación de movimientos)
        result = _proxy.evaluate_round(play_request.player_move, cpu_move)

        # 3. Singleton: actualizar estado global y notificar suscriptores
        _manager.update_state(result)

        return PlayResponse(cpu_move=cpu_move, result=result)

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error en play_round: {str(e)}")
        raise HTTPException(status_code=500, detail="Error interno del servidor")
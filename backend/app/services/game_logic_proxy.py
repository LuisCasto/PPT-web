"""
Patrón Proxy — GameLogicProxy
Actúa como intermediario entre las rutas (frontend) y la lógica de negocio.
Responsabilidades:
  - Validar que los movimientos sean valores permitidos (Move enum).
  - Validar que el modo de juego sea correcto.
  - Desacoplar la validación de la lógica principal.
"""

from app.services.game_logic import GameLogic, Move
from app.config import settings


class GameLogicProxy:
    def __init__(self, real_logic: GameLogic = None):
        self._real = real_logic or GameLogic()

    def evaluate_round(self, player_move: int, cpu_move: int) -> str:
        """Valida los movimientos antes de delegar al objeto real."""
        self._validate_move(player_move, "player_move")
        self._validate_move(cpu_move, "cpu_move")
        return GameLogic.evaluate_round(player_move, cpu_move)

    def get_cpu_move(self, mode: str, player_move: int) -> int:
        """Valida el modo y obtiene la jugada de la CPU."""
        self._validate_mode(mode)
        if mode == "normal":
            return GameLogic.get_cpu_move_normal()
        return GameLogic.get_cpu_move_imposible(player_move)

    # ------------------------------------------------------------------
    # Validaciones privadas
    # ------------------------------------------------------------------

    @staticmethod
    def _validate_move(move: int, field: str = "move"):
        allowed = [m.value for m in Move]
        if move not in allowed:
            raise ValueError(
                f"Movimiento inválido en '{field}': {move}. "
                f"Valores permitidos: {allowed}"
            )

    @staticmethod
    def _validate_mode(mode: str):
        if mode not in settings.ALLOWED_GAME_MODES:
            raise ValueError(
                f"Modo inválido: '{mode}'. "
                f"Modos permitidos: {settings.ALLOWED_GAME_MODES}"
            )
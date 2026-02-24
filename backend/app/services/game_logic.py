"""
game_logic.py — Refactorizado
Cambios respecto a la versión original:
  - Se eliminaron los magic numbers (1, 2, 3).
  - Se introdujo el Enum `Move` para representar jugadas con semántica clara.
  - La lógica de victorias usa tuplas de Move en lugar de enteros sueltos.
"""

import random
from enum import IntEnum


class Move(IntEnum):
    ROCK = 1      # Piedra
    PAPER = 2     # Papel
    SCISSORS = 3  # Tijera


# Mapa de jugadas ganadoras: clave gana a valor
WINNING_MOVES = {
    (Move.ROCK, Move.SCISSORS),
    (Move.PAPER, Move.ROCK),
    (Move.SCISSORS, Move.PAPER),
}


class GameLogic:
    """Lógica pura del juego Piedra, Papel o Tijera."""

    @staticmethod
    def evaluate_round(player_move: int, cpu_move: int) -> str:
        """
        Evalúa quién gana la ronda.
        Returns: 'player', 'cpu' o 'tie'
        """
        p = Move(player_move)
        c = Move(cpu_move)

        if p == c:
            return "tie"
        if (p, c) in WINNING_MOVES:
            return "player"
        return "cpu"

    @staticmethod
    def get_cpu_move_normal() -> int:
        """Modo Normal: jugada aleatoria."""
        return int(random.choice(list(Move)))

    @staticmethod
    def get_cpu_move_imposible(player_move: int) -> int:
        """
        Modo Imposible: 80 % de probabilidad de que la CPU gane.
        20 % de probabilidad de jugada aleatoria.
        """
        if random.randint(0, 100) < 20:
            return int(random.choice(list(Move)))

        # La jugada que derrota al jugador
        counter = {
            Move.ROCK: Move.PAPER,
            Move.PAPER: Move.SCISSORS,
            Move.SCISSORS: Move.ROCK,
        }
        return int(counter[Move(player_move)])

    @staticmethod
    def calculate_score(player_wins: int, cpu_wins: int, ties: int) -> int:
        """Calcula el puntaje final."""
        return (player_wins * 100) - (cpu_wins * 100) + (ties * 25)
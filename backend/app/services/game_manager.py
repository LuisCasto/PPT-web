"""
Patrón Singleton — GameManager
Garantiza una única instancia del gestor de partida en toda la aplicación.
El estado del juego (victorias, derrotas, empates) es consistente y accesible
desde cualquier parte del sistema sin riesgo de duplicación.
"""


class GameManager:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.state = {
                "player_wins": 0,
                "cpu_wins": 0,
                "ties": 0,
            }
            cls._instance._subscribers = []
        return cls._instance

    def get_state(self) -> dict:
        return self.state.copy()

    def update_state(self, result: str):
        """Actualiza el estado y notifica a los suscriptores (Observer)."""
        if result == "player":
            self.state["player_wins"] += 1
        elif result == "cpu":
            self.state["cpu_wins"] += 1
        elif result == "tie":
            self.state["ties"] += 1
        self._notify()

    def reset(self):
        self.state = {"player_wins": 0, "cpu_wins": 0, "ties": 0}
        self._notify()

    def subscribe(self, callback):
        """Suscribe un callback para recibir notificaciones (patrón Observer)."""
        self._subscribers.append(callback)

    def _notify(self):
        for callback in self._subscribers:
            callback(self.state.copy())
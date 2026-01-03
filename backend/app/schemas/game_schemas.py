from pydantic import BaseModel, Field

class PlayRequest(BaseModel):
    player_move: int = Field(..., ge=1, le=3, description="1=Piedra, 2=Papel, 3=Tijera")
    mode: str = Field(..., pattern="^(normal|imposible)$")

class PlayResponse(BaseModel):
    cpu_move: int = Field(..., ge=1, le=3)
    result: str = Field(..., pattern="^(player|cpu|tie)$")
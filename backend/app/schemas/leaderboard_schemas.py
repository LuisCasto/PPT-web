from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class LeaderboardEntry(BaseModel):
    player_name: str = Field(..., min_length=1, max_length=50)
    score: int
    mode: str = Field(..., pattern="^(normal|imposible)$")
    timestamp: Optional[datetime] = None

class LeaderboardResponse(BaseModel):
    player_name: str
    score: int
    timestamp: datetime
    
    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
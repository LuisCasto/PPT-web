from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

class Database:
    client: AsyncIOMotorClient = None
    
db = Database()

async def get_database():
    return db.client[settings.DATABASE_NAME]

async def connect_to_mongo():
    """Conectar a MongoDB al iniciar la aplicación"""
    print("🔌 Conectando a MongoDB...")
    db.client = AsyncIOMotorClient(settings.MONGODB_URI)
    
    # Verificar conexión
    try:
        await db.client.admin.command('ping')
        print("✅ Conexión exitosa a MongoDB Atlas!")
    except Exception as e:
        print(f"❌ Error conectando a MongoDB: {e}")
        raise

async def close_mongo_connection():
    """Cerrar conexión al apagar la aplicación"""
    print("🔌 Cerrando conexión a MongoDB...")
    db.client.close()
    print("✅ Conexión cerrada")

async def save_leaderboard_entry(player_name: str, score: int, mode: str):
    """Guardar entrada en el leaderboard"""
    database = await get_database()
    collection_name = f"leaderboard_{mode}"
    collection = database[collection_name]
    
    from datetime import datetime
    entry = {
        "player_name": player_name,
        "score": score,
        "timestamp": datetime.utcnow()
    }
    
    result = await collection.insert_one(entry)
    return result.inserted_id

async def get_leaderboard(mode: str, limit: int = 10):
    """Obtener top jugadores del leaderboard"""
    database = await get_database()
    collection_name = f"leaderboard_{mode}"
    collection = database[collection_name]
    
    cursor = collection.find().sort("score", -1).limit(limit)
    entries = await cursor.to_list(length=limit)
    
    return entries
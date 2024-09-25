from starlette.config import Config
from starlette.datastructures import Secret

try:
    config = Config(".env")
except FileNotFoundError:
    config = Config()

DATABASE_URL = config("DATABASE_URL", cast=Secret)
ENVIRONMENT = config("ENVIRONMENT", cast=str)
WEATHER_API_KEY = config("WEATHER_API_KEY", cast=Secret)

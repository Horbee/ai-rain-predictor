from typing_extensions import TypedDict
from rain_predictor.types import RainPredictResponse


class CityWeather(TypedDict):
    temperature: float
    humidity: float
    pressure: float
    name: str
    last_updated: str


class CityWeatherWithRainPredictionResponse(TypedDict):
    city_weather: CityWeather
    prediction: RainPredictResponse

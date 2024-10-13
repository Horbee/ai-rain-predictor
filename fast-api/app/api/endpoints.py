import numpy as np
import requests
import settings

from rain_predictor import model_pipeline
from rain_predictor.types import RainPredictResponse

from measurements.model import Measurement
from measurements.types import MeasurementWithRainPredictionResponse

from weather.types import CityWeatherWithRainPredictionResponse

from fastapi import APIRouter
from pydantic import BaseModel

from sqlmodel import Session, select, delete
from db import engine


class MeasurementsBody(BaseModel):
    temp: float
    humidity: float
    pressure: float


router = APIRouter(prefix="/api")


@router.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "UP"}


@router.post("/rain_predict")
def rain_predict(body: list[MeasurementsBody]) -> list[RainPredictResponse]:
    items = [Measurement(temperature=measurement.temp, humidity=measurement.humidity,
                         pressure=measurement.pressure) for measurement in body]
    with Session(engine) as session:
        session.add_all(items)
        session.commit()

    input = np.array([[measurement.temp, measurement.humidity,
                       measurement.pressure] for measurement in body], dtype=np.float32)
    return model_pipeline(input)


@router.get("/measurements")
def read_measurements() -> list[MeasurementWithRainPredictionResponse]:
    with Session(engine) as session:
        # order by created_at desc
        measurements = session.exec(
            select(Measurement)
            .order_by(Measurement.created_at.desc())
        ).all()

        if (len(measurements) == 0):
            return []

        input = np.array([[measurement.temperature, measurement.humidity,
                          measurement.pressure] for measurement in measurements], dtype=np.float32)
        predictions = model_pipeline(input)
        return [{"measurement": measurement, "prediction": prediction} for measurement, prediction in zip(measurements, predictions)]


@router.delete("/measurements/{id}")
def delete_measurement(id: int):
    with Session(engine) as session:
        session.exec(
            delete(Measurement)
            .where(Measurement.id == id)
        )
        session.commit()
    return id


@router.get("/weather")
def city_weather(city: str) -> CityWeatherWithRainPredictionResponse:
    url = f"https://api.weatherapi.com/v1/current.json?q={city}&key={settings.WEATHER_API_KEY}"

    response = requests.get(url)

    if response.status_code == 200:
        r = response.json()
        temperature = r["current"]["temp_c"]
        humidity = r["current"]["humidity"]
        pressure = r["current"]["pressure_mb"]
        name = r["location"]["name"]
        last_updated = r["current"]["last_updated"]
        input = np.array([[temperature, humidity, pressure]], dtype=np.float32)
        prediction = model_pipeline(input)
        return {"city_weather": {"temperature": temperature, "humidity": humidity, "pressure": pressure, "name": name, "last_updated": last_updated}, "prediction": prediction[0]}
    else:
        print(f"Error fetching weather data: {response.status_code}")
        print(f"Response content: {response.text}")
        return {"error": "Failed to fetch weather data"}

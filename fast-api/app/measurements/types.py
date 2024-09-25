from typing_extensions import TypedDict
from measurements.model import Measurement
from rain_predictor.types import RainPredictResponse


class MeasurementWithRainPredictionResponse(TypedDict):
    measurement: Measurement
    prediction: RainPredictResponse

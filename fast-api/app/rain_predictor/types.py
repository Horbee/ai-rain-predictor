from typing_extensions import TypedDict


class RainPredictResponse(TypedDict):
    prediction: str
    probability: float

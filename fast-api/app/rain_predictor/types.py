import onnxruntime as ort
from typing_extensions import TypedDict, Literal


class RainPredictResponse(TypedDict):
    prediction: str
    probability: float


class OrtSessions(TypedDict):
    pytorch_nn: ort.InferenceSession
    sckitlearn_forest: ort.InferenceSession


ModelType = Literal["pytorch_nn", "sckitlearn_forest"]

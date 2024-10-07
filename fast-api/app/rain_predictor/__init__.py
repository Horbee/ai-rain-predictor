import os
import onnxruntime as ort
import numpy as np
from rain_predictor.types import ModelType, OrtSessions

ort_sessions: OrtSessions = {"pytorch_nn":  ort.InferenceSession(os.path.join(os.path.dirname(__file__), "rain_predictor.onnx")),
                             "sckitlearn_forest":  ort.InferenceSession(os.path.join(os.path.dirname(__file__), "rain_predictor_forest.onnx"))}


def model_pipeline(input_tensor: np.ndarray, model: ModelType):
    return predict(input_tensor, ort_sessions[model])


def predict(input_tensor: np.ndarray, session: ort.InferenceSession):
    input_name = session.get_inputs()[0].name
    outputs = session.run(None, {input_name: input_tensor})
    y_logits = outputs[0]
    probabilities = 1 / (1 + np.exp(-y_logits))
    predictions = np.round(probabilities)
    return [{"prediction": "Rain" if pred > 0.5 else "No Rain", "probability": prob} for pred, prob in zip(predictions, probabilities)]

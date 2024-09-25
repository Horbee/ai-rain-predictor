import os
import onnxruntime as ort
import numpy as np

ort_session = ort.InferenceSession(os.path.join(os.path.dirname(__file__),
                                                "rain_predictor.onnx"))


def model_pipeline(input_tensor: np.ndarray):
    return predict(input_tensor)


def predict(input_tensor: np.ndarray):
    outputs = ort_session.run(None, {"input": input_tensor})
    y_logits = outputs[0]
    probabilities = 1 / (1 + np.exp(-y_logits))
    predictions = np.round(probabilities)
    return [{"prediction": "Rain" if pred > 0.5 else "No Rain", "probability": prob} for pred, prob in zip(predictions, probabilities)]

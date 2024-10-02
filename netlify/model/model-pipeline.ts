import * as ort from "onnxruntime-node";
import path from "path";

export const predict = async (inputData: number[][]) => {
  try {
    // Load the ONNX model
    const model = path.join(__dirname, "../model/rain_predictor.onnx");

    const session = await ort.InferenceSession.create(model);

    // Convert the input data to a Float32Array
    const inputTensor = new ort.Tensor(
      "float32",
      Float32Array.from(inputData.flat()),
      [inputData.length, 3]
    );

    // Run the inference
    const outputs = await session.run({ input: inputTensor });

    // Apply sigmoid function
    const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
    const probabilities = Array.from(outputs.output.data).map(sigmoid);

    return probabilities.map((probability) => ({
      prediction: probability > 0.5 ? "Rain" : "No Rain",
      probability,
    }));
  } catch (error) {
    console.error("Error:", error);
  }
};

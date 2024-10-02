declare module "onnxruntime-node" {
  export class InferenceSession {
    static create(path: string): Promise<InferenceSession>;
    run(feeds: { [key: string]: Tensor }): Promise<InferenceSession.ReturnType>;
  }

  export namespace InferenceSession {
    type ReturnType = { [key: string]: Tensor };
  }

  export class Tensor {
    constructor(
      type: string,
      data: Float32Array | Int32Array | Int8Array,
      dims: number[]
    );
    data: Float32Array | Int32Array | Int8Array;
  }
}

import { getMeasurements } from "../actions/measurements";
import { predict } from "../model/model-pipeline";

import type { Config } from "@netlify/functions";

export default async () => {
  const measurements = await getMeasurements();

  const input = measurements.map((m) => [
    m.temperature,
    m.humidity,
    m.pressure,
  ]);

  const prediction = (await predict(input)) ?? [];

  return Response.json(
    prediction.map((p, i) => ({
      measurement: measurements[i],
      prediction: p,
    }))
  );
};

export const config: Config = {
  path: "/measurements",
  method: "GET",
};

import { predict } from "../model/model-pipeline";

import type { Config } from "@netlify/functions";

export default async (req: Request) => {
  const body = (await req.json()) as number[][];

  const prediction = await predict(body);

  return Response.json({
    prediction,
  });
};

export const config: Config = {
  path: "/rain_predict",
  method: "POST",
};

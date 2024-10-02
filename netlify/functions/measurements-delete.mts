import { deleteMeasurement } from "../actions/measurements";

import type { Config, Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const { id } = context.params;

  await deleteMeasurement(id);

  return Response.json(Number(id));
};

export const config: Config = {
  path: "/measurements/:id",
  method: "DELETE",
};

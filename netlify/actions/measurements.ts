import { neon } from "@neondatabase/serverless";

import type { Measurement } from "../types/measurements";

export const getMeasurements = async (): Promise<Measurement[]> => {
  const databaseUrl = Netlify.env.get("DATABASE_URL");
  const sql = neon(databaseUrl || "");
  const data = await sql`SELECT * FROM measurements ORDER BY "created_at" DESC`;

  const parsedData = data.map((d) => ({
    ...d,
    temperature: parseFloat(d.temperature),
    humidity: parseFloat(d.humidity),
    pressure: parseFloat(d.pressure),
  }));

  return parsedData as Measurement[];
};

export const deleteMeasurement = async (id: string) => {
  const databaseUrl = Netlify.env.get("DATABASE_URL");
  const sql = neon(databaseUrl || "");
  return sql`DELETE FROM measurements WHERE id=${id}`;
};

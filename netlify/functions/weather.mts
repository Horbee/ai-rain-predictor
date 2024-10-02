import { predict } from "../model/model-pipeline";

import type { Config, Context } from "@netlify/functions";
import type { WeatherApiCityResponse } from "../types/weather-api";

export default async (req: Request, context: Context) => {
  const { city } = (await req.json()) as { city: string };

  if (!city)
    return Response.json({ error: "city is required" }, { status: 400 });

  const weatherApiKey = Netlify.env.get("WEATHER_API_KEY");

  const url = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${weatherApiKey}`;
  const resp = await fetch(url);
  const data = (await resp.json()) as WeatherApiCityResponse;

  const { temp_c, humidity, pressure_mb, last_updated } = data.current;
  const { name } = data.location;

  const input = [[temp_c, humidity, pressure_mb]];

  const prediction = await predict(input);
  return Response.json({
    city_weather: {
      temperature: temp_c,
      humidity: humidity,
      pressure: pressure_mb,
      name: name,
      last_updated: last_updated,
    },
    prediction: prediction?.[0] ?? null,
  });
};

export const config: Config = {
  path: "/weather",
  method: "POST",
};

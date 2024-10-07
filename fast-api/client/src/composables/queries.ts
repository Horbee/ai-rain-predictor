import { useQuery } from "@tanstack/vue-query";
import { useDefaultApi } from "@/composables/useDefaultApi";

export const useMeasurementsQuery = () => {
  const api = useDefaultApi();
  const readMeasurementsApiMeasurementsGet = api.readMeasurementsApiMeasurementsGet.bind(api);

  return useQuery({
    queryKey: ["measurements"],
    queryFn: readMeasurementsApiMeasurementsGet,
    staleTime: 10000,
  });
};

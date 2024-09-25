import { useQueryClient, useQuery, useMutation } from "@tanstack/vue-query";
import { useDefaultApi } from "@/composables/useDefaultApi";

export const useMeasurements = () => {
  const api = useDefaultApi();
  const readMeasurementsApiMeasurementsGet = api.readMeasurementsApiMeasurementsGet.bind(api);
  const deleteMeasurementApiMeasurementsIdDelete = api.deleteMeasurementApiMeasurementsIdDelete.bind(api);

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["measurements"],
    queryFn: readMeasurementsApiMeasurementsGet,
    staleTime: 10000,
  });

  const deleteMeasurement = useMutation({
    mutationFn: deleteMeasurementApiMeasurementsIdDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["measurements"] });
    },
  });

  return { ...query, deleteMeasurement };
};

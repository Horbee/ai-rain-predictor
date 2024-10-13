import { useQueryClient, useMutation } from "@tanstack/vue-query";
import { useDefaultApi } from "@/composables/useDefaultApi";
import { computed } from "vue";

export const useMeasurementDelete = () => {
  const queryClient = useQueryClient();

  const api = useDefaultApi();
  const deleteMeasurementApiMeasurementsIdDelete = api.deleteMeasurementApiMeasurementsIdDelete.bind(api);

  return useMutation({
    mutationFn: deleteMeasurementApiMeasurementsIdDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["measurements"] });
    },
  });
};

export const useManualRainPrediction = () => {
  const queryClient = useQueryClient();

  const api = useDefaultApi();
  const rainPredictApiRainPredictPost = api.rainPredictApiRainPredictPost.bind(api);

  const mutation = useMutation({
    mutationFn: rainPredictApiRainPredictPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["measurements"] });
    },
  });

  const response = computed(() => mutation.data.value?.data[0]);

  return { ...mutation, response };
};

export const useCityRainPrediction = () => {
  const api = useDefaultApi();

  const cityWeatherApiWeatherGet = api.cityWeatherApiWeatherGet.bind(api);

  const mutation = useMutation({
    mutationFn: cityWeatherApiWeatherGet,
  });

  const response = computed(() => mutation.data.value?.data);

  return { ...mutation, response };
};

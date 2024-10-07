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
    mutationFn: (variables: { city: string }) =>
      Promise.all([cityWeatherApiWeatherGet(variables.city, "pytorch_nn"), cityWeatherApiWeatherGet(variables.city, "sckitlearn_forest")]),
  });

  const responses = computed(() => ({
    city: mutation.data.value?.[0].data.city_weather,
    pytorch_nn: mutation.data.value?.[0].data.prediction,
    sckitlearn_forest: mutation.data.value?.[1].data.prediction,
  }));

  return { ...mutation, responses };
};

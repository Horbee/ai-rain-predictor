import { useQueryClient, useMutation } from "@tanstack/vue-query";
import { useDefaultApi } from "@/composables/useDefaultApi";
import { computed } from "vue";

export const useRainPrediction = () => {
  const api = useDefaultApi();
  const rainPredictApiRainPredictPost = api.rainPredictApiRainPredictPost.bind(api);
  const cityWeatherApiWeatherGet = api.cityWeatherApiWeatherGet.bind(api);

  const queryClient = useQueryClient();

  const manualPredict = useMutation({
    mutationFn: rainPredictApiRainPredictPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["measurements"] });
    },
  });

  const cityPredict = useMutation({
    mutationFn: cityWeatherApiWeatherGet,
  });

  const manualPredictResponse = computed(() => manualPredict.data.value?.data[0]);
  const cityPredictResponse = computed(() => cityPredict.data.value?.data);

  return {
    manualPredict,
    manualPredictResponse,
    cityPredict,
    cityPredictResponse,
  };
};

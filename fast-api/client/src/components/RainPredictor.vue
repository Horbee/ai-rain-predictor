<script setup lang="ts">
import { useI18n } from "vue-i18n";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { formatPercentage } from "@/lib/utils";

import { useLocalStorage } from "@vueuse/core";
import { useRainPrediction } from "@/composables/useRainPrediction";

import type { MeasurementsBody } from "@/api";
import type { MessageSchema } from "@/main";

const { t } = useI18n<{ message: MessageSchema }>();

const formState = useLocalStorage<MeasurementsBody>("manualPredictForm", {
  temp: 0,
  humidity: 0,
  pressure: 0,
});

const { manualPredict, manualPredictResponse: response } = useRainPrediction();
</script>

<template>
  <div class="flex flex-col gap-8 items-center mt-8">
    <form @submit.prevent="manualPredict.mutateAsync([formState])" novalidate class="flex flex-col gap-4 max-w-[400px] w-full">
      <Label for="temp">{{ t("rainPredictor.labels.temperature") }}</Label>
      <Input v-model="formState.temp" id="temp" type="number" />

      <Label for="humidity">{{ t("rainPredictor.labels.humidity") }}</Label>
      <Input v-model="formState.humidity" id="humidity" type="number" />

      <Label for="pressure">{{ t("rainPredictor.labels.pressure") }}</Label>
      <Input v-model="formState.pressure" id="pressure" type="number" />

      <Button :disabled="manualPredict.isPending.value">
        {{ t("rainPredictor.buttonTitle") }}
      </Button>
    </form>

    <div v-if="response" class="flex items-center gap-4 max-w-[400px] w-full">
      <span>
        {{ response.prediction }}:
        {{ formatPercentage(response.probability) }}
      </span>
      <Progress :model-value="response.probability * 100" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/vue";
import { formatPercentage } from "@/lib/utils";

import { Table, TableHead, TableRow, TableCell, TableBody, TableHeader } from "@/components/ui/table";

import { useLocalStorage } from "@vueuse/core";
import { useCityRainPrediction } from "@/composables/mutations";

import type { MessageSchema } from "@/main";

const { t } = useI18n<{ message: MessageSchema }>();

const formState = useLocalStorage("lastCity", { city: "" });

const { mutateAsync, isPending, responses } = useCityRainPrediction();

const onSubmit = () => mutateAsync({ city: formState.value.city.trim() });

onMounted(() => {
  if (formState.value.city.trim()) onSubmit();
});
</script>

<template>
  <div class="flex flex-col gap-8 items-center overflow-hidden mt-8">
    <form @submit.prevent="onSubmit" novalidate class="flex flex-col gap-4 max-w-[400px] w-full">
      <Input v-model="formState.city" class="h-8" :placeholder="t('rainPredictor.labels.city')" />

      <Button :disabled="!formState.city.trim() || isPending" size="sm">
        {{ t("rainPredictor.buttonTitle") }}
      </Button>
    </form>
  </div>

  <div v-if="responses.city" class="mt-8 overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{{ t("rainPredictor.labels.lastUpdated") }}</TableHead>
          <TableHead>{{ t("rainPredictor.labels.temperature") }}</TableHead>
          <TableHead>{{ t("rainPredictor.labels.pressure") }}</TableHead>
          <TableHead>{{ t("rainPredictor.labels.humidity") }}</TableHead>
          <TableHead>{{ t("rainPredictor.labels.rain") }}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{{ responses.city.last_updated }}</TableCell>
          <TableCell>{{ responses.city.temperature }}</TableCell>
          <TableCell>{{ responses.city.pressure }}</TableCell>
          <TableCell>{{ responses.city.humidity }}</TableCell>
          <TableCell class="flex items-center gap-1">
            <Icon icon="ph:drop" class="h-[1.2rem] w-[1.2rem]" />
            <div class="flex flex-col">
              <span>{{ formatPercentage(responses.pytorch_nn?.probability || 0) }}</span>
              <span>{{ formatPercentage(responses.sckitlearn_forest?.probability || 0) }}</span>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

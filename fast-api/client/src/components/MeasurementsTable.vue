<script setup lang="ts">
import { useI18n } from "vue-i18n";

import { Table, TableHead, TableRow, TableCell, TableBody, TableHeader } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { formatPercentage } from "@/lib/utils";
import { Icon } from "@iconify/vue";
import { useMeasurementDelete } from "@/composables/mutations";
import { useMeasurementsQuery } from "@/composables/queries";

import type { MessageSchema } from "@/main";

const { t } = useI18n<{ message: MessageSchema }>();

const { data: measurements } = useMeasurementsQuery();
const deleteMeasurement = useMeasurementDelete();

const onDeleteMeasurement = async (id: number) => {
  if (confirm(t("rainPredictor.deleteConfirmation"))) {
    await deleteMeasurement.mutateAsync(id);
  }
};
</script>

<template>
  <div class="overflow-x-auto mt-8">
    <h1 class="text-2xl mb-4">{{ t("rainPredictor.labels.olderMeasurements") }}</h1>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>{{ t("rainPredictor.labels.temperature") }}</TableHead>
          <TableHead>{{ t("rainPredictor.labels.pressure") }}</TableHead>
          <TableHead>{{ t("rainPredictor.labels.humidity") }}</TableHead>
          <TableHead>{{ t("rainPredictor.labels.createdAt") }}</TableHead>
          <TableHead>{{ t("rainPredictor.labels.rain") }}</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="{ measurement, prediction } in measurements?.data" :key="measurement.id!">
          <TableCell>{{ measurement.id }}</TableCell>
          <TableCell>{{ measurement.temperature }}</TableCell>
          <TableCell>{{ measurement.pressure }}</TableCell>
          <TableCell>{{ measurement.humidity }}</TableCell>
          <TableCell>{{ new Date(measurement.created_at!).toLocaleString() }} </TableCell>
          <TableCell>
            <Progress :model-value="prediction.probability * 100" />
            <span>{{ formatPercentage(prediction.probability) }}</span>
          </TableCell>
          <TableCell>
            <Button @click="onDeleteMeasurement(measurement.id!)" variant="ghost" size="sm">
              <Icon icon="lucide:trash-2" class="h-[1.2rem] w-[1.2rem] text-red-400" />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import RainPredictor from "@/components/RainPredictor.vue";
import ThemeSelector from "@/components/ThemeSelector.vue";
import MeasurementsTable from "@/components/MeasurementsTable.vue";
import CurrentCityWeather from "@/components/CurrentCityWeather.vue";

import Toaster from "@/components/ui/toast/Toaster.vue";
import { useI18n } from "vue-i18n";
import { useLocalStorage } from "@vueuse/core";

import type { MessageSchema } from "@/main";

const { t } = useI18n<{ message: MessageSchema }>();

const activeTab = useLocalStorage("activeTab", "city");
</script>

<template>
  <div class="p-4 max-w-screen-lg mx-auto">
    <ThemeSelector />

    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-8 items-center">
        <h1 class="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">Rain Predictor</h1>

        <span class="max-w-[750px] text-center text-lg font-light text-foreground">
          {{ t("rainPredictor.description") }}
        </span>
      </div>

      <Tabs v-model="activeTab">
        <div class="flex justify-center">
          <TabsList class="grid grid-cols-3">
            <TabsTrigger value="city"> {{ t("rainPredictor.tabs.city") }} </TabsTrigger>
            <TabsTrigger value="manual"> {{ t("rainPredictor.tabs.manual") }} </TabsTrigger>
            <TabsTrigger value="older"> {{ t("rainPredictor.tabs.measurements") }} </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="city">
          <CurrentCityWeather />
        </TabsContent>
        <TabsContent value="manual">
          <RainPredictor />
        </TabsContent>
        <TabsContent value="older">
          <MeasurementsTable />
        </TabsContent>
      </Tabs>
    </div>
  </div>

  <Toaster />
</template>

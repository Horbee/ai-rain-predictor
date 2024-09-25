import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { VueQueryPlugin } from "@tanstack/vue-query";
import en from "@/locales/en.json";
import hu from "@/locales/hu.json";

import "./styles.css";

import App from "./App.vue";

const userLang = navigator.languages ? navigator.languages[0] : navigator.language;

console.log({ userLang });

export type MessageSchema = typeof en;

const i18n = createI18n<[MessageSchema], "en" | "hu">({
  legacy: false,
  locale: userLang,
  fallbackLocale: "en",
  messages: {
    en: en,
    hu: hu,
  },
});

createApp(App).use(i18n).use(VueQueryPlugin).mount("#app");

import axios from "axios";

import { DefaultApi } from "@/api";
import { useToast } from "@/components/ui/toast";
import { useI18n } from "vue-i18n";

import type { MessageSchema } from "@/main";

export const useDefaultApi = () => {
  const { t } = useI18n<{ message: MessageSchema }>();
  const { toast } = useToast();

  const httpClient = axios.create();

  httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("Axios error: ", error);
      toast({
        title: t("rainPredictor.error.title"),
        description: t("rainPredictor.error.description"),
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  );

  return new DefaultApi(undefined, window.origin, httpClient);
};

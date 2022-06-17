import type { SettingValue } from "@/data/Setting/SettingValue";
import { defineStore } from "pinia";

export const useSettingStore = defineStore({
  id: "setting",
  state: () => ({
    values: {} as SettingValue,
    text_channels: [] as SettingValue[],
    voice_channels: [] as SettingValue[],
    roles: [] as SettingValue[],
    loading: true,
  }),
  getters: {},
  actions: {},
});

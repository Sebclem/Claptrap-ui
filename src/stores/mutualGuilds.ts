import type { Guild } from "@/data/guild/Guild";
import { defineStore } from "pinia";

export const useMutualGuildsStore = defineStore({
  id: "mutualGuilds",
  state: () => ({
    guilds: [] as Array<Guild>,
    loaded: false,
    lastGuildId: undefined as string | undefined,
  }),
  getters: {},
  actions: {
    getGuild(id: string): Guild | undefined {
      return this.guilds.find((elem) => elem.id == id);
    },
  },
  persist: true,
});

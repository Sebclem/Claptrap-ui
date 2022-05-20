import { defineStore } from "pinia";

export const useUserStore = defineStore("user",{
  state: () => ({
    name: undefined as string | undefined,
    discordId: undefined as string | undefined,
    token: undefined as string | undefined,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {},
});

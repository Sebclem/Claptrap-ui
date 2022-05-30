import { defineStore } from "pinia";

export const useInviteLinkStore = defineStore({
  id: "inviteLink",
  state: () => ({
    inviteLink: "",
  }),
  getters: {
    isPresent(): boolean {
      return !!this.inviteLink;
    },
  },
  actions: {},
  persist: true,
});

import { defineStore } from "pinia";
import * as jose from "jose";
import { cookiesStorage } from "./coockiesStorage";

export const useUserStore = defineStore("user", {
  state: () => ({
    userName: "",
    discordId: "",
    discriminator: "",
    avatar: "",
    token: "",
    loginFail: false,
    asExpired: false,
  }),
  getters: {
    isLoggedIn(): boolean {
      if (this.token) {
        return !this.isExpired;
      }
      return false;
    },
    isExpired(): boolean {
      if (this.getTokenPayload?.exp) {
        const exp = new Date(this.getTokenPayload.exp * 1000);
        const expired = exp < new Date();
        this.asExpired = expired;
        return expired;
      }
      return true;
    },
    getTokenPayload: (state) => {
      return jose.decodeJwt(state.token);
    },
  },
  actions: {},
  persist: {
    storage: cookiesStorage,
  },
});

import { defineStore } from "pinia";
import * as jose from "jose";
import axios from "axios";
import { cookiesStorage } from "./coockiesStorage";

export const useUserStore = defineStore("user", {
  state: () => ({
    userName: "",
    discordId: "",
    discriminator: "",
    avatar: "",
    token: "",
    loginFail: false,
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
        return exp < new Date();
      }
      return true;
    },
    getTokenPayload: (state) => {
      const token = state.token;
      return jose.decodeJwt(state.token);
    },
  },
  actions: {},
  persist: {
    storage: cookiesStorage,
  },
});

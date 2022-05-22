import { defineStore } from "pinia";
import * as jose from "jose";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    userName: "",
    discordId: "",
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
      return jose.decodeJwt(state.token);
    },
  },
  actions: {
    async login(code: string) {
      const baseApi = import.meta.env.VITE_API_BASE_URL;
      const baseUrl = window.location.origin;
      try {
        const response = await axios.post(baseApi + "auth/discord", {
          redirectUri: baseUrl + "/oauth2/callback",
          code: code,
        });

        this.token = response.data.token;
        const payload = this.getTokenPayload;
        if (payload.sub) {
          this.userName = payload.sub;
        }
        if (payload.discord_id) {
          this.discordId = payload.discord_id as string;
        }

        this.loginFail = false;
        console.log("Loggin success !");
        return true;
      } catch (reason) {

        console.log("Loggin fail !");
        console.log(reason);
        this.token = "";
        this.userName = "";
        this.discordId = "";
        this.loginFail = true;
        return false;
      }
    },
  },
});

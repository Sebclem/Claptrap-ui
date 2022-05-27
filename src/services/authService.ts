import { useUserStore } from "@/stores/user";
import axios from "axios";

async function login(code: string): Promise<boolean> {
  const userStore = useUserStore();
  const baseApi = import.meta.env.VITE_API_BASE_URL;
  const baseUrl = window.location.origin;
  try {
    const response = await axios.post(baseApi + "auth/discord", {
      redirectUri: baseUrl + "/oauth2/callback",
      code: code,
    });

    userStore.token = response.data.token;
    const payload = userStore.getTokenPayload;

    userStore.userName = payload.sub as string;
    userStore.discordId = payload.discord_id as string;
    userStore.discriminator = payload.discriminator as string;
    userStore.avatar = payload.avatar as string;

    userStore.loginFail = false;
    console.log("Loggin success !");
    return true;
  } catch (reason) {
    console.log("Loggin fail !");
    console.log(reason);
    userStore.token = "";
    userStore.userName = "";
    userStore.discordId = "";
    userStore.loginFail = true;
    return false;
  }
}

export { login };

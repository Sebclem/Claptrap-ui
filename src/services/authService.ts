import { useEventQueuStore } from "@/stores/eventQueu";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { useRouter } from "vue-router";

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
    const eventQueuStore = useEventQueuStore();
    eventQueuStore.push({
      uuid: undefined,
      type: "success",
      text: "You are now logged in",
    });

    return true;
  } catch (reason) {
    console.log("Loggin fail !");
    console.log(reason);
    logout(false, true);

    const eventQueuStore = useEventQueuStore();
    eventQueuStore.push({
      uuid: undefined,
      type: "error",
      text: "Login fail, Please try aguain.",
    });
    return false;
  }
}

function logout(expired: boolean, loginFail: boolean): void {
  const userStore = useUserStore();
  userStore.token = "";
  userStore.userName = "";
  userStore.discordId = "";
  userStore.loginFail = loginFail;
  userStore.asExpired = expired;

  const eventQueuStore = useEventQueuStore();
  if (!expired && !loginFail) {
    eventQueuStore.push({
      uuid: undefined,
      type: "success",
      text: "Disconnected",
    });
  } else if (expired) {
    eventQueuStore.push({
      uuid: undefined,
      type: "warning",
      text: "Sesion expired, please re-login",
    });
  } else {
    eventQueuStore.push({
      uuid: undefined,
      type: "error",
      text: "Login fail, please try again",
    });
  }
}

export { login, logout };

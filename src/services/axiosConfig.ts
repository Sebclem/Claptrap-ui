import router from "@/router";
import { useUserStore } from "@/stores/user";
import axios, { AxiosError } from "axios";
import { logout } from "./authService";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.request.use((config) => {
  const userStore = useUserStore();
  if (config.headers) {
    config.headers.authorization = `Bearer ${userStore.token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const cast = error as AxiosError;
    console.log(cast);
    if (cast.response?.status == 401) {
      console.log("401, Login expired, logout...");
      logout(true, false);
      useUserStore().originRoute = router.currentRoute.value;
      router.push({ name: "oauth-redirect" });
      return;
    }
    return Promise.reject(error);
  }
);

export default instance;

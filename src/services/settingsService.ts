import type { SettingDescrition } from "@/data/Setting/SettingDescription";
import { useUserStore } from "@/stores/user";
import axios from "axios";

export function getSettingDescrition() {
  return new Promise<SettingDescrition[]>((resole, reject) => {
    const userStore = useUserStore();

    axios
      .get<SettingDescrition[]>("/setting/description", {
        headers: {
          authorization: `Bearer ${userStore.token}`,
        },
      })
      .then((value) => {
        resole(value.data);
      });
  });
}

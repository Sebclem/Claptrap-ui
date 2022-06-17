import type { RawSettingValue } from "@/data/Setting/RawSettingValue";
import type { SettingDescrition } from "@/data/Setting/SettingDescription";
import { useEventQueuStore } from "@/stores/eventQueu";
import { useUserStore } from "@/stores/user";
import axios from "axios";

function getSettingDescrition() {
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

function getSettingValues(guildId: string): Promise<RawSettingValue[]> {
  return new Promise((resolve, reject) => {
    const userStore = useUserStore();
    axios
      .get<RawSettingValue[]>(`/setting/${guildId}/values`, {
        headers: {
          authorization: `Bearer ${userStore.token}`,
        },
      })
      .then((value) => {
        resolve(value.data);
      })
      .catch((reason) => {
        console.error(`Fail to get settings !`);
        console.log(reason);
        const eventQueuStore = useEventQueuStore();
        eventQueuStore.push({
          uuid: undefined,
          type: "error",
          text: "Fail to retrive current settings!",
        });
        reject(reason);
      });
  });
}

export { getSettingDescrition, getSettingValues };

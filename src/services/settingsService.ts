import type { RawSettingValue } from "@/data/Setting/RawSettingValue";
import type { SettingDescrition } from "@/data/Setting/SettingDescription";
import type { SettingValue } from "@/data/Setting/SettingValue";
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

function sendSetting(
  guildId: string,
  data: SettingValue,
  description: SettingDescrition[]
): Promise<RawSettingValue[]> {
  return new Promise((resolve, reject) => {
    const userStore = useUserStore();

    const converted = buildValuePayload(data, description);
    axios
      .post<RawSettingValue[]>(`/setting/${guildId}/values`, converted, {
        headers: {
          authorization: `Bearer ${userStore.token}`,
        },
      })
      .then((value) => {
        resolve(value.data);
      })
      .catch((reason) => {
        console.error(`Fail to save settings !`);
        console.log(reason);
        const eventQueuStore = useEventQueuStore();
        eventQueuStore.push({
          uuid: undefined,
          type: "error",
          text: "Fail to save settings !",
        });
        reject(reason);
      });
  });
}

function buildValuePayload(
  data: SettingValue,
  description: SettingDescrition[]
): RawSettingValue[] {
  const temp = [] as RawSettingValue[];
  for (const item of description) {
    if (item.mainField) {
      temp.push({ id: item.mainField.id, value: data[item.mainField.id] });
    }
    for (const field of item.fields) {
      temp.push({ id: field.id, value: data[field.id] });
    }
  }
  return temp;
}

export { getSettingDescrition, getSettingValues, sendSetting };

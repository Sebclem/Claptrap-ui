import type { Status } from "@/data/music/Status";
import { useEventQueuStore } from "@/stores/eventQueu";
import { useUserStore } from "@/stores/user";
import axios from "axios";

function getAudioStatus(guildId: string): Promise<Status> {
  return new Promise((resolve, reject) => {
    const userStore = useUserStore();
    axios
      .get<Status>(`/audio/${guildId}/status`, {
        headers: {
          authorization: `Bearer ${userStore.token}`,
        },
      })
      .then((value) => {
        resolve(value.data);
      })
      .catch((reason) => {
        console.error(`Fail to retrive audio status !`);
        console.log(reason);
        const eventQueuStore = useEventQueuStore();
        eventQueuStore.push({
          uuid: undefined,
          type: "error",
          text: "Fail to retrive audio status !",
        });
        reject(reason);
      });
  });
}

export { getAudioStatus };

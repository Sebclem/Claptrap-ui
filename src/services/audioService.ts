import type { Status } from "@/data/music/Status";
import { useEventQueuStore } from "@/stores/eventQueu";
import { useUserStore } from "@/stores/user";
import axios from "axios";

function getAudioStatus(guildId: string) {
  const userStore = useUserStore();
  return axios
    .get<Status>(`/audio/${guildId}/status`, {
      headers: {
        authorization: `Bearer ${userStore.token}`,
      },
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
    });
}

function connect(guildId: string, voiceChannelId: string) {
  const userStore = useUserStore();
  return axios
    .post<Status>(
      `/audio/${guildId}/connect`,
      {
        channelId: voiceChannelId,
      },
      {
        headers: {
          authorization: `Bearer ${userStore.token}`,
        },
      }
    )
    .catch((reason) => {
      console.error(`Fail to connect to voice channel !`);
      console.log(reason);
      const eventQueuStore = useEventQueuStore();
      eventQueuStore.push({
        uuid: undefined,
        type: "error",
        text: "Fail to connect to voice channel !",
      });
    });
}

function disconnect(guildId: string) {
  const userStore = useUserStore();
  return axios
    .post<Status>(
      `/audio/${guildId}/disconnect`,
      {},
      {
        headers: {
          authorization: `Bearer ${userStore.token}`,
        },
      }
    )
    .catch((reason) => {
      console.error(`Fail to disconnect from voice channel !`);
      console.log(reason);
      const eventQueuStore = useEventQueuStore();
      eventQueuStore.push({
        uuid: undefined,
        type: "error",
        text: "Fail to disconnect from voice channel !",
      });
    });
}

export { getAudioStatus, connect, disconnect };

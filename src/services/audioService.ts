import type { Status } from "@/data/music/Status";
import { useEventQueuStore } from "@/stores/eventQueu";
import { useUserStore } from "@/stores/user";
import axios from "./axiosConfig";

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

      const eventQueuStore = useEventQueuStore();
      eventQueuStore.push({
        uuid: undefined,
        type: "error",
        text: "Fail to disconnect from voice channel !",
      });
    });
}

function resume(guildId: string) {
  const userStore = useUserStore();
  return axios
    .post<Status>(
      `/audio/${guildId}/resume`,
      {},
      {
        headers: {
          authorization: `Bearer ${userStore.token}`,
        },
      }
    )
    .catch((reason) => {
      console.error(`Fail to resume playback !`);
      const eventQueuStore = useEventQueuStore();
      eventQueuStore.push({
        uuid: undefined,
        type: "error",
        text: "Fail to resume playback !",
      });
    });
}

function pause(guildId: string) {
  const userStore = useUserStore();
  return axios
    .post<Status>(
      `/audio/${guildId}/pause`,
      {},
      {
        headers: {
          authorization: `Bearer ${userStore.token}`,
        },
      }
    )
    .catch((reason) => {
      console.error(`Fail to pause playback !`);
      const eventQueuStore = useEventQueuStore();
      eventQueuStore.push({
        uuid: undefined,
        type: "error",
        text: "Fail to pause playback !",
      });
    });
}

function skip(guildId: string) {
  const userStore = useUserStore();
  return axios
    .post<Status>(
      `/audio/${guildId}/skip`,
      {},
      {
        headers: {
          authorization: `Bearer ${userStore.token}`,
        },
      }
    )
    .catch((reason) => {
      console.error(`Fail to skip playback !`);
      const eventQueuStore = useEventQueuStore();
      eventQueuStore.push({
        uuid: undefined,
        type: "error",
        text: "Fail to skip playback !",
      });
    });
}

function stop(guildId: string) {
  const userStore = useUserStore();
  return axios
    .post<Status>(
      `/audio/${guildId}/stop`,
      {},
      {
        headers: {
          authorization: `Bearer ${userStore.token}`,
        },
      }
    )
    .catch((reason) => {
      console.error(`Fail to stop playback !`);
      const eventQueuStore = useEventQueuStore();
      eventQueuStore.push({
        uuid: undefined,
        type: "error",
        text: "Fail to stop playback !",
      });
    });
}

function add(guildId: string, url: string) {
  const userStore = useUserStore();
  return axios
    .post<Status>(
      `/audio/${guildId}/add`,
      {
        url: url,
      },
      {
        headers: {
          authorization: `Bearer ${userStore.token}`,
        },
      }
    )
    .catch((reason) => {
      console.error(`Fail to add track to playlist !`);
      const eventQueuStore = useEventQueuStore();
      eventQueuStore.push({
        uuid: undefined,
        type: "error",
        text: "Fail to add track to playlist !",
      });
    });
}

export { getAudioStatus, connect, disconnect, resume, pause, skip, stop, add };

import type { Chanel } from "@/data/guild/Channel";
import type { Guild } from "@/data/guild/Guild";
import type { InviteLink } from "@/data/InviteLink";
import { useEventQueuStore } from "@/stores/eventQueu";
import { useUserStore } from "@/stores/user";
import axios from "axios";

function getMutualGuilds(): Promise<Guild[]> {
  return new Promise((resolve, reject) => {
    const userStore = useUserStore();

    axios
      .get<Guild[]>("/guild/mutual", {
        headers: {
          authorization: `Bearer ${userStore.token}`,
        },
      })
      .then((value) => {
        console.log(value);
        resolve(value.data);
      })
      .catch((reason) => {
        console.error(`Fail to get mutal guilds !`);
        console.log(reason);
        const eventQueuStore = useEventQueuStore();
        eventQueuStore.push({
          uuid: undefined,
          type: "error",
          text: "Fail to retrive guilds !",
        });
        reject(reason);
      });
  });
}

function getInviteLink(): Promise<InviteLink> {
  return new Promise((resolve, reject) => {
    const userStore = useUserStore();

    axios
      .get<InviteLink>("/guild/inviteLink", {
        headers: {
          authorization: `Bearer ${userStore.token}`,
        },
      })
      .then((value) => {
        console.log(value);
        resolve(value.data);
      })
      .catch((reason) => {
        console.error(`Fail to get Invite !`);
        console.log(reason);
        const eventQueuStore = useEventQueuStore();
        eventQueuStore.push({
          uuid: undefined,
          type: "error",
          text: "Fail to retrive invite link !",
        });
        reject(reason);
      });
  });
}

function getTextChannels(guildId: string): Promise<Chanel[]> {
  return new Promise((resolve, reject) => {
    const userStore = useUserStore();
    axios
      .get<Chanel[]>(`/guild/${guildId}/textChannels`, {
        headers: {
          authorization: `Bearer ${userStore.token}`,
        },
      })
      .then((value) => {
        resolve(value.data);
      })
      .catch((reason) => {
        console.error(`Fail to get text channels !`);
        console.log(reason);
        const eventQueuStore = useEventQueuStore();
        eventQueuStore.push({
          uuid: undefined,
          type: "error",
          text: "Fail to retrive text channels!",
        });
        reject(reason);
      });
  });
}

function getVoiceChannels(guildId: string): Promise<Chanel[]> {
  return new Promise((resolve, reject) => {
    const userStore = useUserStore();
    axios
      .get<Chanel[]>(`/guild/${guildId}/voiceChannels`, {
        headers: {
          authorization: `Bearer ${userStore.token}`,
        },
      })
      .then((value) => {
        resolve(value.data);
      })
      .catch((reason) => {
        console.error(`Fail to get text channels !`);
        console.log(reason);
        const eventQueuStore = useEventQueuStore();
        eventQueuStore.push({
          uuid: undefined,
          type: "error",
          text: "Fail to retrive voice channels!",
        });
        reject(reason);
      });
  });
}
function getRoles(guildId: string): Promise<Chanel[]> {
  return new Promise((resolve, reject) => {
    const userStore = useUserStore();
    axios
      .get<Chanel[]>(`/guild/${guildId}/roles`, {
        headers: {
          authorization: `Bearer ${userStore.token}`,
        },
      })
      .then((value) => {
        resolve(value.data);
      })
      .catch((reason) => {
        console.error(`Fail to get roles !`);
        console.log(reason);
        const eventQueuStore = useEventQueuStore();
        eventQueuStore.push({
          uuid: undefined,
          type: "error",
          text: "Fail to retrive roles!",
        });
        reject(reason);
      });
  });
}

export {
  getMutualGuilds,
  getInviteLink,
  getTextChannels,
  getVoiceChannels,
  getRoles,
};

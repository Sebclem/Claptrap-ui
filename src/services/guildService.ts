import type { Guild } from "@/data/Guild";
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

export { getMutualGuilds, getInviteLink };

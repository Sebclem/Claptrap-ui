import type { Guild } from "@/data/guild/Guild";
import { useMutualGuildsStore } from "@/stores/mutualGuilds";
import type { Router } from "vue-router";

function redirectIfNoGuild(guild: Guild | undefined, router: Router) {
  const guildStore = useMutualGuildsStore();
  if (!guild) {
    guildStore.lastGuildId = guildStore.guilds[0]?.id;
    if (guildStore.lastGuildId) {
      router.push({
        name: "guildHome",
        params: { guildId: guildStore.lastGuildId },
      });
    } else {
      router.push({ name: "home" });
    }
  }
}

export { redirectIfNoGuild };

<template>
  <v-row v-if="!userStore.isLoggedIn">
    <v-col>
      <v-btn to="/oauth2/redirect" prepend-icon="mdi-discord" color="primary">
        Login
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useMutualGuildsStore } from "@/stores/mutualGuilds";
import { useUserStore } from "@/stores/user";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const mutualGuildStore = useMutualGuildsStore();
const router = useRouter();

onBeforeMount(() => {
  if (userStore.isLoggedIn) {
    if (!mutualGuildStore.lastGuildId) {
      mutualGuildStore.lastGuildId = mutualGuildStore.guilds[0].id;
    }
    router.push({
      name: "guildHome",
      params: { guildId: mutualGuildStore.lastGuildId },
    });
  }
});
</script>

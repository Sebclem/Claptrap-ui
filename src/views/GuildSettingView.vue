<template>
  <div>
    <SettingListComponent :guild="guild" v-if="guild" />
  </div>
</template>

<script setup lang="ts">
import { useMutualGuildsStore } from "@/stores/mutualGuilds";
import { redirectIfNoGuild } from "@/tools/GuildTools";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import SettingListComponent from "../components/guild/Settings/SettingListComponent.vue";

const guildStore = useMutualGuildsStore();
const route = useRoute();
const router = useRouter();

const guild = ref(guildStore.getGuild(route.params.guildId as string));
redirectIfNoGuild(guild.value, router);

watch(
  () => route.params.guildId,
  (value, oldValue) => {
    guild.value = guildStore.getGuild(value as string);
    guildStore.lastGuildId = guild.value?.id;
    redirectIfNoGuild(guild.value, router);
  }
);
</script>

<style scoped></style>

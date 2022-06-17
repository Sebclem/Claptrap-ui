<template>
  <div v-if="guild">
    <v-row>
      <v-col>
        <GuildHeaderComponent :guild="guild" />
      </v-col>
    </v-row>
    <SettingListComponent :guild="guild" />
  </div>
</template>

<script setup lang="ts">
import { useMutualGuildsStore } from "@/stores/mutualGuilds";
import { redirectIfNoGuild } from "@/tools/GuildTools";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import SettingListComponent from "../components/guild/Settings/SettingListComponent.vue";
import GuildHeaderComponent from "@/components/guild/GuildHeaderComponent.vue";
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

<template>
  <div v-if="guild">
    <v-row>
      <v-col>
        <GuildHeaderComponent :guild="guild" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-row>
          <v-col md="6" cols="12">
            <AudioPreviewComponent :guild="guild"></AudioPreviewComponent>
          </v-col>
          <v-col md="6" cols="12">
            <StatsPreviewComponent></StatsPreviewComponent>
          </v-col>
          <v-col md="6" cols="12">
            <SettingPreviewComponent :guild="guild" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import GuildHeaderComponent from "@/components/guild/GuildHeaderComponent.vue";
import { useMutualGuildsStore } from "@/stores/mutualGuilds";
import { redirectIfNoGuild } from "@/tools/GuildTools";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AudioPreviewComponent from "../components/guild/home/AudioPreviewComponent.vue";
import SettingPreviewComponent from "../components/guild/home/SettingPreviewComponent.vue";
import StatsPreviewComponent from "../components/guild/home/StatsPreviewComponent.vue";

const guildStore = useMutualGuildsStore();
const route = useRoute();
const router = useRouter();

const guild = ref(guildStore.getGuild(route.params.guildId as string));
redirectIfNoGuild(guild.value, router);
</script>

<style scoped></style>

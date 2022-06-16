<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="d-flex">
            <v-avatar
              :color="guild?.iconUrl ? '' : 'grey-darken-3'"
              class="mr-3"
            >
              <v-img v-if="guild?.iconUrl" :src="guild.iconUrl"></v-img>
              <template v-if="!guild?.iconUrl">{{ guild?.name[1] }}</template>
            </v-avatar>
            <span class="mr-auto">{{ guild?.name }}</span>
            <v-icon
              icon="mdi-account-wrench"
              color="green"
              v-if="guild?.canManage"
            ></v-icon>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-container>
          <v-row>
            <v-col cols="6">
              <MusicPreviewComponent></MusicPreviewComponent>
            </v-col>
            <v-col cols="6">
              <StatsPreviewComponent></StatsPreviewComponent>
            </v-col>
            <v-col cols="6">
              <SettingPreviewComponent />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useMutualGuildsStore } from "@/stores/mutualGuilds";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import SettingPreviewComponent from "../components/guild/home/SettingPreviewComponent.vue";
import MusicPreviewComponent from "../components/guild/home/MusicPreviewComponent.vue";
import StatsPreviewComponent from "../components/guild/home/StatsPreviewComponent.vue";
import { redirectIfNoGuild } from "@/tools/GuildTools";

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

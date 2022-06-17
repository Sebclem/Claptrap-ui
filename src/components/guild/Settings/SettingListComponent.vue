<template>
  <div>
    <v-overlay
      v-model="loading"
      class="align-center justify-center"
      persistent
      scrim="grey darken-4"
      z-index="1"
    >
      <v-progress-circular
        indeterminate
        color="yellow"
        size="200"
        width="15"
      ></v-progress-circular>
    </v-overlay>
    <v-row>
      <v-col
        v-for="item of settingsDescription"
        :key="item.name"
        md="6"
        cols="12"
      >
        <setting-group-component :descriptor="item"></setting-group-component>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import type { Guild } from "@/data/guild/Guild";
import type { SettingDescrition } from "@/data/Setting/SettingDescription";
import type { SettingValue } from "@/data/Setting/SettingValue";
import {
  getRoles,
  getTextChannels,
  getVoiceChannels,
} from "@/services/guildService";
import {
  getSettingDescrition,
  getSettingValues,
} from "@/services/settingsService";
import { useSettingStore } from "@/stores/setting";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import SettingGroupComponent from "./SettingGroupComponent.vue";

const props = defineProps<{ guild: Guild }>();

const settingStore = useSettingStore();
const { values, loading, text_channels, voice_channels, roles } =
  storeToRefs(settingStore);
loading.value = true;
values.value = {};
const settingsDescription = ref([] as SettingDescrition[]);

getSettingDescrition().then((value) => {
  settingsDescription.value = value;
  loadTextChannels();
});

function loadTextChannels() {
  getTextChannels(props.guild.id).then((value) => {
    text_channels.value = value;
    loadVoiceChannels();
  });
}

function loadVoiceChannels() {
  getVoiceChannels(props.guild.id).then((value) => {
    voice_channels.value = value;
    loadRoles();
  });
}

function loadRoles() {
  getRoles(props.guild.id).then((value) => {
    roles.value = value;
    loadSettings();
  });
}

function loadSettings() {
  getSettingValues(props.guild.id).then((value) => {
    let temp = {} as SettingValue;
    for (let item of value) {
      temp[item.id] = item.value;
    }

    values.value = temp;
    loading.value = false;
  });
}
</script>

<style scoped></style>

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
    <v-form ref="form">
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
    </v-form>
    <v-row justify="center">
      <v-col cols="12" md="2">
        <v-btn
          v-on:click="send"
          color="success"
          prepend-icon="mdi-content-save"
          block
          :disabled="preventSave"
          v-if="settingsDescription.length > 0"
        >
          Save
        </v-btn>
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
  sendSetting,
} from "@/services/settingsService";
import { useEventQueuStore } from "@/stores/eventQueu";
import { useSettingStore } from "@/stores/setting";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
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
    settingStore.savedValues = JSON.parse(JSON.stringify(temp));
    loading.value = false;
  });
}

const form = ref(null);
const preventSave = ref(false);

watch(
  values,
  () => {
    const theForm = form.value as any;
    theForm?.validate().then((value: any) => {
      preventSave.value =
        !value.valid ||
        JSON.stringify(values.value) ==
          JSON.stringify(settingStore.savedValues);
    });
  },
  { deep: true }
);
function send() {
  const theForm = form.value as any;
  theForm?.validate().then((value: any) => {
    if (value.valid) {
      loading.value = true;
      sendSetting(
        props.guild.id,
        settingStore.values,
        settingsDescription.value
      )
        .then((saved) => {
          let temp = {} as SettingValue;
          for (let item of saved) {
            temp[item.id] = item.value;
          }
          values.value = temp;
          settingStore.savedValues = JSON.parse(JSON.stringify(temp));
          loading.value = false;
          const eventQueuStore = useEventQueuStore();
          eventQueuStore.push({
            uuid: undefined,
            type: "success",
            text: "Settings saved",
          });
        })
        .catch(() => {
          loading.value = false;
        });
    }
  });
}
</script>

<style scoped></style>

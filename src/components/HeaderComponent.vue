<template>
  <v-app-bar class="bg-brown-darken-4">
    <v-app-bar-title class="text-yellow font-weight-black text-h4">
      Claptrap Bot
    </v-app-bar-title>
  </v-app-bar>
  <v-navigation-drawer expand-on-hover rail position="right" v-if="isLoggedIn">
    <v-list class="overflow-hidden">
      <v-list-item
        :prepend-avatar="getAvatar()"
        :title="userName"
        :subtitle="'#' + discriminator"
      >
        <template v-slot:append>
          <v-list-item-avatar end>
            <v-btn
              icon="mdi-exit-to-app"
              class="text-high-emphasis text-white"
              v-on:click="logout(false, false)"
            ></v-btn>
          </v-list-item-avatar>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav>
      <v-list-item>
        <v-list-item-avatar :start="true">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-list-item-avatar>
        <v-list-item-subtitle> Loading... </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-snackbar
    v-for="(data, index) of snacks"
    :key="data.uuid"
    v-model="data.snack"
    top="true"
    left="true"
    :style="{ 'margin-top': calcMargin(index) }"
    :color="data.color"
  >
    <div>{{ data.text }}</div>
    <template v-slot:actions>
      <v-btn
        variant="text"
        icon="mdi-close"
        @click="data.snack = false"
      ></v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { logout } from "@/services/authService";
import { useEventQueuStore } from "@/stores/eventQueu";
import { ref, watch } from "vue";

const userStore = useUserStore();
const eventQueuStore = useEventQueuStore();

const { userName, avatar, discriminator, isLoggedIn } = storeToRefs(userStore);

function getAvatar() {
  const avatarBaseUrl = import.meta.env.VITE_DISCORD_USER_AVATAR_URL;
  return avatarBaseUrl + userStore.discordId + "/" + avatar.value + ".png";
}

function calcMargin(i: number) {
  return i * 60 + 70 + "px";
}

let snacks = ref<
  { text: string; color: string; snack: boolean; uuid: string }[]
>([]);

eventQueuStore.$subscribe((mutation, state) => {
  if (state.events.length != 0) {
    let event = eventQueuStore.shift();
    if (event?.uuid) {
      snacks.value.push({
        snack: true,
        text: event.text,
        color: event.type,
        uuid: event.uuid,
      });
    }
  }
});

watch(
  snacks,
  (newValue, oldValue) => {
    let filtered = snacks.value.filter((value) => value.snack);
    if (JSON.stringify(filtered) != JSON.stringify(snacks.value)) {
      snacks.value = filtered;
    }
  },
  { deep: true }
);

if (eventQueuStore.size != 0) {
  let event = eventQueuStore.shift();
  if (event?.uuid) {
    snacks.value.push({
      snack: true,
      text: event.text,
      color: event.type,
      uuid: event.uuid,
    });
  }
}
</script>

<style scoped></style>

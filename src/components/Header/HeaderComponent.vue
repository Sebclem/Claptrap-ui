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
    <server-list-component />
  </v-navigation-drawer>
  <snackbar-component />
</template>

<script setup lang="ts">
import { logout } from "@/services/authService";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import ServerListComponent from "./ServerListComponent.vue";
import SnackbarComponent from "./SnackbarComponent.vue";

const userStore = useUserStore();
const { userName, avatar, discriminator, isLoggedIn } = storeToRefs(userStore);
function getAvatar() {
  const avatarBaseUrl = import.meta.env.VITE_DISCORD_USER_AVATAR_URL;
  return avatarBaseUrl + userStore.discordId + "/" + avatar.value + ".png";
}
</script>

<style scoped></style>

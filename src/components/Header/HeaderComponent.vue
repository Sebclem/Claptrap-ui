<template>
  <v-app-bar class="bg-brown-darken-4">
    <v-app-bar-title class="text-yellow font-weight-black text-h4">
      <div class="d-flex align-center">
        <router-link to="/">
          <v-avatar><v-img src="/icon.png"></v-img></v-avatar>
        </router-link>
        <span class="ml-3 d-none d-sm-inline">
          <router-link to="/" class="text-yellow" style="text-decoration: none">
            Claptrap Bot
          </router-link>
        </span>
      </div>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon to="/"><v-icon>mdi-home</v-icon></v-btn>
    <v-app-bar-nav-icon
      @click="drawer = !drawer"
      v-if="mobile"
    ></v-app-bar-nav-icon>
  </v-app-bar>
  <v-navigation-drawer
    :expand-on-hover="!mobile"
    :rail="!mobile"
    location="right"
    v-if="isLoggedIn"
    v-model="drawer"
    :temporary="mobile"
  >
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
              v-on:click="logoutAndRedirect()"
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
import { ref } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import ServerListComponent from "./ServerListComponent.vue";
import SnackbarComponent from "./SnackbarComponent.vue";

const userStore = useUserStore();
const drawer = ref(true);
const { userName, avatar, discriminator, isLoggedIn } = storeToRefs(userStore);
const { mobile } = useDisplay();

function getAvatar() {
  const avatarBaseUrl = import.meta.env.VITE_DISCORD_USER_AVATAR_URL;
  return avatarBaseUrl + userStore.discordId + "/" + avatar.value + ".png";
}

function logoutAndRedirect() {
  logout(false, false);
  window.location.assign("/");
}
</script>

<style scoped></style>

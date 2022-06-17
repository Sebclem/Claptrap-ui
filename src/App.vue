<template>
  <v-app>
    <header-component />
    <v-main>
      <v-container>
        <router-view v-slot="{ Component, route }">
          <v-scroll-x-transition mode="out-in">
            <component :is="Component" :key="route.path" />
          </v-scroll-x-transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import HeaderComponent from "./components/Header/HeaderComponent.vue";
</script>

<style>
html {
  overflow: auto;
}
</style>

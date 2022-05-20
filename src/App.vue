<template>
  <v-app>
    <header-component />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import HeaderComponent from "./components/HeaderComponent.vue";
</script>

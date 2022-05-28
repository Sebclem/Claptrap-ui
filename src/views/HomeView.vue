<template>
  <v-row v-if="!userStore.isLoggedIn">
    <v-col>
      <v-btn to="/oauth2/redirect" prepend-icon="mdi-discord" color="primary">
        Login
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { onBeforeMount } from "vue";
const userStore = useUserStore();
onBeforeMount(() => {
  userStore.isLoggedIn;
});
</script>

<template>
  <v-row>
    <v-col class="d-flex justify-center align-center mt-16">
      <v-progress-circular size="200" width="17" color="yellow" indeterminate></v-progress-circular>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import axios from "axios";
import { useRoute } from "vue-router";

const baseApi = import.meta.env.VITE_API_BASE_URL;
const baseUrl = window.location.origin;

const route = useRoute();

axios.post(baseApi + "login/discord", {
  redirectUri: baseUrl + "/oauth2/callback",
  code: route.query.code,
});
</script>

<style scoped></style>

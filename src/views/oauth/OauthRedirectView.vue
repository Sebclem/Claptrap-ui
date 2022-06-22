<template>
  <v-row>
    <v-col class="d-flex justify-center align-center mt-16">
      <v-progress-circular
        size="200"
        width="17"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
window.location.assign(import.meta.env.VITE_OAUTH_REDIRECT_URL);
</script>

<style scoped></style>

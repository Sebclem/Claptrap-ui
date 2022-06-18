<template>
  <v-row>
    <v-col class="d-flex justify-center align-center mt-16">
      <v-progress-circular
        size="200"
        width="17"
        color="yellow"
        indeterminate
      ></v-progress-circular>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { login } from "@/services/authService";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
if (route.query.code) {
  login(route.query.code as string).then(() => {
    router.push("/");
  });
} else {
  router.push({ name: "oauth-redirect" });
}
</script>

<style scoped></style>

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
import { login } from "@/services/authService";
import { useUserStore } from "@/stores/user";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
if (route.query.code) {
  login(route.query.code as string).then(() => {
    if (userStore.originRoute) {
      let route = JSON.parse(JSON.stringify(userStore.originRoute));
      userStore.originRoute = undefined;
      router.push(route);
    } else {
      router.push("/");
    }
  });
} else {
  router.push({ name: "oauth-redirect" });
}
</script>

<style scoped></style>

<template>
  <v-row v-if="loginFail" titl>
    <v-col>
      <v-alert title="Login Fail" closable type="error" density="compact">
        Login fail, please try again.
      </v-alert>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { loginFail } = storeToRefs(userStore);
</script>

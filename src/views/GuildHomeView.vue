<template>
  {{ route.params.guildId }}
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style scoped></style>

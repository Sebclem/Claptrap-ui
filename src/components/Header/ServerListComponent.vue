<template>
  <v-list nav>
    <v-list-item v-if="!props.loaded">
      <v-scale-transition appear>
        <v-list-item-avatar :start="true">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-list-item-avatar>
        <v-list-item-subtitle> Loading... </v-list-item-subtitle>
      </v-scale-transition>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import type { Guild } from "@/data/Guild";

const props = defineProps<{
  guilds: Guild[];
  loaded: boolean;
}>();
</script>

<style scoped></style>

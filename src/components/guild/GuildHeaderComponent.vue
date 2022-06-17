<template>
  <div>
    <v-card>
      <v-card-title class="d-flex">
        <v-avatar :color="guild?.iconUrl ? '' : 'grey-darken-3'" class="mr-3">
          <v-img v-if="guild?.iconUrl" :src="guild.iconUrl"></v-img>
          <template v-if="!guild?.iconUrl">{{ guild?.name[1] }}</template>
        </v-avatar>
        <span class="mr-auto">{{ guild?.name }}</span>
        <v-icon
          icon="mdi-account-wrench"
          color="green"
          v-if="guild?.canManage"
        ></v-icon>
      </v-card-title>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { Guild } from "@/data/guild/Guild";

defineProps<{ guild: Guild }>();
</script>

<style scoped></style>

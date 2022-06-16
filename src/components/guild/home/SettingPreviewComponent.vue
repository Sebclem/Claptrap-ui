<template>
  <v-card title="Guild Settings" :disabled="!properties.guild?.canManage">
    <template v-slot:prepend>
      <v-icon color="yellow" size="x-large">mdi-cog</v-icon>
    </template>
    <v-card-text class="d-flex justify-center">
      <v-btn
        color="info"
        prepend-icon="mdi-progress-wrench"
        size="large"
        :to="{
          name: 'guildSetting',
          params: { guildId: properties.guild?.id },
        }"
      >
        Go to settings
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { Guild } from "@/data/Guild";

const properties = defineProps<{
  guild?: Guild;
}>();
</script>

<style scoped></style>

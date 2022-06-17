<template>
  <v-row>
    <v-col>
      <v-text-field
        :id="fieldDescription.id"
        :label="fieldDescription.name"
        color="yellow"
        :messages="fieldDescription.description"
        density="compact"
        hide-details="auto"
        :loading="loading"
        variant="outlined"
        v-model="settingStore.values[fieldDescription.id]"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { FieldDescriptor } from "@/data/Setting/SettingDescription";
import { useSettingStore } from "@/stores/setting";
import { storeToRefs } from "pinia";
defineProps<{ fieldDescription: FieldDescriptor }>();

const settingStore = useSettingStore();

const { loading } = storeToRefs(settingStore);
</script>

<style scoped></style>

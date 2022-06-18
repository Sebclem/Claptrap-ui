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
        :rules="[required]"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { FieldDescriptor } from "@/data/Setting/SettingDescription";
import { useSettingStore } from "@/stores/setting";
import { storeToRefs } from "pinia";
const props = defineProps<{
  fieldDescription: FieldDescriptor;
  required: boolean;
}>();

const settingStore = useSettingStore();

const { loading } = storeToRefs(settingStore);

function required(value: string) {
  return props.required ? !!value || "Required" : true;
}
</script>

<style scoped></style>

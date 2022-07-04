<template>
  <v-row>
    <v-col>
      <v-autocomplete
        :id="fieldDescription.id"
        :label="fieldDescription.name"
        color="primary"
        :messages="fieldDescription.description"
        density="compact"
        hide-details="auto"
        :loading="loadingComp"
        item-title="name"
        item-value="id"
        :items="items?.value"
        variant="outlined"
        v-model="values[fieldDescription.id]"
        :rules="[required]"
      ></v-autocomplete>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { FieldDescriptor } from "@/data/Setting/SettingDescription";
import { useSettingStore } from "@/stores/setting";
import { computed } from "vue";
import { storeToRefs } from "pinia";
const props = defineProps<{
  fieldDescription: FieldDescriptor;
  required: boolean;
}>();

const settingStore = useSettingStore();

function required(value: string) {
  return props.required
    ? !!values.value[props.fieldDescription.id] || "Required"
    : true;
}

const { loading, roles, text_channels, voice_channels, values } =
  storeToRefs(settingStore);
const loadingComp = computed(() => {
  return loading.value ? "info" : false;
});

const items = computed(() => {
  if (props.fieldDescription.type == "TEXT_CHANNEL") {
    return text_channels;
  }
  if (props.fieldDescription.type == "VOICE_CHANNEL") {
    return voice_channels;
  }
  if (props.fieldDescription.type == "ROLE") {
    return roles;
  }
  return undefined;
});
</script>

<style scoped></style>

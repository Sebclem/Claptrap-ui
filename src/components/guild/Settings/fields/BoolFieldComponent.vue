<template>
  <div>
    <v-row>
      <v-col>
        <v-switch
          :id="fieldDescription.id"
          :label="fieldDescription.name"
          color="yellow"
          :messages="fieldDescription.description"
          density="compact"
          hide-details="auto"
          :loading="loadingComp"
          v-model="values[fieldDescription.id]"
        ></v-switch>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import type { FieldDescriptor } from "@/data/Setting/SettingDescription";
import { useSettingStore } from "@/stores/setting";
import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";
defineProps<{ fieldDescription: FieldDescriptor }>();

const settingStore = useSettingStore();
const { values, loading } = storeToRefs(settingStore);
const loadingComp = computed(() => {
  return loading.value ? "info" : false;
});
</script>

<style scoped></style>

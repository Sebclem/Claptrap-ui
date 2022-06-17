<template>
  <div>
    <v-card>
      <v-card-title>{{ props.descriptor.name }}</v-card-title>
      <v-card-content class="pt-1">
        <v-container class="py-0">
          <v-row v-if="props.descriptor.mainField" class="mb-4">
            <v-col>
              <bool-field-component
                v-if="props.descriptor.mainField.type == 'BOOL'"
                :fieldDescription="props.descriptor.mainField"
              ></bool-field-component>
            </v-col>
          </v-row>
          <template
            v-if="
              !!props.descriptor.mainField
                ? settingStoreRef.values.value[props.descriptor.mainField.id]
                : true
            "
          >
            <v-row v-for="item of props.descriptor.fields" :key="item.id">
              <v-col>
                <bool-field-component
                  v-if="item.type == 'BOOL'"
                  :fieldDescription="item"
                ></bool-field-component>
                <select-field-component
                  :fieldDescription="item"
                  v-if="isSelect(item.type)"
                ></select-field-component>
                <text-field-component
                  :fieldDescription="item"
                  v-if="item.type == 'STRING'"
                ></text-field-component>
              </v-col>
            </v-row>
          </template>
        </v-container>
      </v-card-content>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { SettingDescrition } from "@/data/Setting/SettingDescription";
import { useSettingStore } from "@/stores/setting";
import { storeToRefs } from "pinia";
import boolFieldComponent from "./fields/BoolFieldComponent.vue";
import SelectFieldComponent from "./fields/SelectFieldComponent.vue";
import TextFieldComponent from "./fields/TextFieldComponent.vue";

const props = defineProps<{ descriptor: SettingDescrition }>();

const settingStore = useSettingStore();
const settingStoreRef = storeToRefs(settingStore);

function isSelect(type: string) {
  switch (type) {
    case "TEXT_CHANNEL":
    case "VOICE_CHANNEL":
    case "ROLE":
      return true;
    default:
      return false;
  }
}
</script>

<style scoped></style>

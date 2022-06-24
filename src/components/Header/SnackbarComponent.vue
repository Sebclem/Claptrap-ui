<template>
  <v-snackbar
    v-for="(data, index) of snacks"
    :key="data.uuid"
    v-model="data.snack"
    location="top start"
    :style="{ 'margin-top': calcMargin(index) }"
    :color="data.color"
  >
    <div>
      <v-icon class="mr-2">{{ data.icon }}</v-icon>
      {{ data.text }}
    </div>
    <template v-slot:actions>
      <v-btn
        variant="text"
        icon="mdi-close"
        @click="data.snack = false"
      ></v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useEventQueuStore } from "@/stores/eventQueu";
import { ref, watch } from "vue";

const eventQueuStore = useEventQueuStore();

function calcMargin(i: number) {
  return i * 60 + 70 + "px";
}

let snacks = ref<
  { text: string; color: string; snack: boolean; uuid: string; icon: string }[]
>([]);

eventQueuStore.$subscribe((mutation, state) => {
  if (state.events.length != 0) {
    let event = eventQueuStore.shift();
    if (event?.uuid) {
      if (
        snacks.value.filter((value) => value.text == event?.text).length == 0
      ) {
        snacks.value.push({
          snack: true,
          text: event.text,
          color: event.type,
          uuid: event.uuid,
          icon: getIcon(event.type),
        });
      }
    }
  }
});

watch(
  snacks,
  () => {
    let filtered = snacks.value.filter((value) => value.snack);
    if (JSON.stringify(filtered) != JSON.stringify(snacks.value)) {
      snacks.value = filtered;
    }
  },
  { deep: true }
);

if (eventQueuStore.size != 0) {
  let event = eventQueuStore.shift();
  if (event?.uuid) {
    if (snacks.value.filter((value) => value.text == event?.text).length == 0) {
      snacks.value.push({
        snack: true,
        text: event.text,
        color: event.type,
        uuid: event.uuid,
        icon: getIcon(event.type),
      });
    }
  }
}

function getIcon(type: string) {
  switch (type) {
    case "success":
      return "mdi-check";
    case "warning":
      return "mdi-alert";
    case "error":
      return "mdi-alert-decagram";
    default:
      return "mdi-alert-circle";
  }
}
</script>

<style scoped></style>

<template>
  <v-snackbar
    v-for="(data, index) of snacks"
    :key="data.uuid"
    v-model="data.snack"
    top="true"
    left="true"
    :style="{ 'margin-top': calcMargin(index) }"
    :color="data.color"
  >
    <div>{{ data.text }}</div>
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
  { text: string; color: string; snack: boolean; uuid: string }[]
>([]);

eventQueuStore.$subscribe((mutation, state) => {
  if (state.events.length != 0) {
    let event = eventQueuStore.shift();
    if (event?.uuid) {
      snacks.value.push({
        snack: true,
        text: event.text,
        color: event.type,
        uuid: event.uuid,
      });
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
    snacks.value.push({
      snack: true,
      text: event.text,
      color: event.type,
      uuid: event.uuid,
    });
  }
}
</script>

<style scoped></style>

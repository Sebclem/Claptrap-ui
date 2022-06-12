<template>
  <v-card title="Music">
    <template v-slot:prepend>
      <v-icon color="yellow" size="x-large">mdi-music-circle</v-icon>
    </template>
    <v-container class="pt-0">
      <v-row>
        <v-col class="d-flex align-center">
          <v-avatar color="grey-darken-3" size="x-large">
            <v-icon icon="mdi-connection"></v-icon>
          </v-avatar>
          <v-row class="ml-3">
            <v-col>
              <h4>Not connected to voice channel</h4>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-progress-linear
            model-value="0"
            background-color="blue-grey"
            color="lime"
            height="10"
            rounded
          ></v-progress-linear>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-center">
          <v-btn icon="mdi-play" class="mr-2" variant="outlined"></v-btn>
          <v-btn icon="mdi-skip-next" class="mr-2" variant="outlined"></v-btn>
          <v-btn icon="mdi-stop" class="mr-2" variant="outlined"></v-btn>
          <v-btn icon="mdi-eject" class="mr-2" variant="outlined"></v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-overlay
      v-model="loading"
      contained
      class="align-center justify-center"
      persistent
    >
    </v-overlay>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";

const loading = ref(false);
</script>

<style scoped></style>

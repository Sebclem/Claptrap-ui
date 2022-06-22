<template>
  <v-card title="Audio">
    <template v-slot:prepend>
      <v-icon color="primary" size="x-large">mdi-music-circle</v-icon>
    </template>
    <template v-slot:append v-if="status.connected && status.canView">
      <v-menu v-model="chanListMenuOpen">
        <template v-slot:activator="{ props }">
          <v-btn
            color="black"
            :disabled="connectBtnDisable"
            size="small"
            v-bind="props"
          >
            {{ status.channel?.name }}
          </v-btn>
        </template>
        <v-list>
          <v-list v-if="chanListLoading">
            <v-list-item>
              <v-progress-circular indeterminate color="primary" />
            </v-list-item>
          </v-list>
          <v-list
            v-else
            :items="voiceChannelList"
            item-title="name"
            item-value="id"
            :selected="selectedListVoice"
            active-color="primary"
            @update:selected="voiceChannelSelected"
          >
          </v-list>
        </v-list>
      </v-menu>
    </template>
    <v-container class="pt-0">
      <v-row class="px-lg-6 px-0">
        <v-col v-if="!status.connected" class="d-flex align-center">
          <v-avatar color="grey-darken-3" size="x-large">
            <v-icon icon="mdi-connection"></v-icon>
          </v-avatar>
          <v-row class="ml-3">
            <v-col>
              <h4>Not connected to voice channel</h4>
            </v-col>
          </v-row>
        </v-col>
        <v-col v-else-if="status.connected">
          <v-row>
            <v-col class="d-flex align-center">
              <template v-if="status.canView && !status.playBackInfo?.stopped">
                <v-avatar
                  color="grey-darken-3"
                  size="x-large"
                  :image="
                    'https://img.youtube.com/vi/' +
                    status.playBackInfo?.trackInfo?.detail.identifier +
                    '/hqdefault.jpg'
                  "
                />
                <v-row class="ml-3">
                  <v-col>
                    <h4>
                      {{ status.playBackInfo?.trackInfo?.detail.title }}
                    </h4>
                    <div class="d-flex align-center">
                      <h5 class="text-grey-lighten-1">
                        {{ status.playBackInfo?.trackInfo?.detail.author }}
                      </h5>
                      <v-spacer />
                      <v-avatar
                        size="x-small"
                        :color="
                          status.playBackInfo?.trackInfo?.submitter.avatar
                            ? ''
                            : 'grey-darken-3'
                        "
                        class="mr-2"
                      >
                        <v-img
                          v-if="
                            status.playBackInfo?.trackInfo?.submitter.avatar
                          "
                          :src="
                            status.playBackInfo?.trackInfo?.submitter.avatar
                          "
                        ></v-img>
                        <template
                          v-if="
                            !status.playBackInfo?.trackInfo?.submitter.avatar
                          "
                          >{{
                            status.playBackInfo?.trackInfo?.submitter.avatar[1]
                          }}</template
                        ></v-avatar
                      >
                      <h5 class="text-grey-lighten-1">
                        {{ status.playBackInfo?.trackInfo?.submitter.username }}
                      </h5>
                    </div>
                  </v-col>
                </v-row>
              </template>
              <template
                v-else-if="status.canView && status.playBackInfo?.stopped"
              >
                <v-avatar
                  color="grey-darken-3"
                  size="x-large"
                  icon="mdi-stop"
                />
                <v-row class="ml-3">
                  <v-col>
                    <h4>Playback stoped</h4>
                  </v-col>
                </v-row>
              </template>
              <template v-else-if="!status.canView">
                <v-avatar
                  color="grey-darken-3"
                  size="x-large"
                  icon="mdi-lock"
                />
              </template>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="px-lg-7 px-0">
        <v-col class="pb-0"> {{ currentProgress }} </v-col>
        <v-col class="d-flex justify-end pb-0"> {{ totalTime }} </v-col>
      </v-row>
      <v-row class="px-lg-7 px-0">
        <v-col class="mt-1">
          <v-progress-linear
            v-model="progress"
            background-color="blue-grey"
            color="lime"
            height="10"
            rounded
          ></v-progress-linear>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-center mt-2">
          <v-btn
            :icon="playPauseIcon"
            class="mr-4 elevation-10"
            variant="outlined"
            :disabled="actionBtnDisable"
            :color="actionBtnDisable ? '' : 'primary'"
          ></v-btn>
          <v-btn
            icon="mdi-skip-next"
            class="mr-4 elevation-10"
            variant="outlined"
            :disabled="actionBtnDisable"
            :color="actionBtnDisable ? '' : 'primary'"
          ></v-btn>
          <v-btn
            icon="mdi-stop"
            class="mr-4 elevation-10"
            :disabled="actionBtnDisable"
            :color="actionBtnDisable ? '' : 'primary'"
            variant="outlined"
          ></v-btn>
          <v-btn
            v-if="status.connected"
            icon="mdi-eject"
            variant="outlined"
            :disabled="connectBtnDisable"
            :color="connectBtnDisable ? '' : 'primary'"
            class="elevation-10"
          ></v-btn>
          <v-btn
            v-else
            icon="mdi-connection"
            variant="outlined"
            :disabled="connectBtnDisable"
            :color="connectBtnDisable ? '' : 'primary'"
            class="elevation-10"
            id="connectBtn"
          ></v-btn>
        </v-col>
      </v-row>
      <v-overlay
        v-model="loading"
        contained
        class="align-center justify-center"
        persistent
        scrim="black"
      >
        <v-progress-circular
          color="primary"
          indeterminate
          size="100"
          width="7"
        />
      </v-overlay>
      <v-overlay
        v-model="privateChan"
        contained
        class="align-center justify-center"
        persistent
        scrim="black"
      >
        <h2 class="text-center mb-3"><v-icon>mdi-lock</v-icon></h2>
        <h2 class="text-center">Connected to private channel</h2>
      </v-overlay>
    </v-container>
  </v-card>

  <v-menu
    v-model="chanListMenuOpen"
    activator="#connectBtn"
    v-if="!status.connected"
  >
    <v-list v-if="chanListLoading">
      <v-list-item>
        <v-progress-circular indeterminate color="primary" />
      </v-list-item>
    </v-list>
    <v-list
      v-else
      :items="voiceChannelList"
      item-title="name"
      item-value="id"
      @update:selected="voiceChannelSelected"
    >
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import type { Chanel } from "@/data/guild/Channel";
import type { Guild } from "@/data/guild/Guild";
import type { Status } from "@/data/music/Status";
import { connect, getAudioStatus } from "@/services/audioService";
import { getVoiceChannels } from "@/services/guildService";
import { computed } from "@vue/reactivity";
import { ref, watch } from "vue";
import { onBeforeRouteUpdate } from "vue-router";

const properties = defineProps<{
  guild: Guild;
}>();

const loading = ref(true);

const status = ref<Status>({ connected: false });

const chanListMenuOpen = ref(false);
const chanListLoading = ref(true);
const voiceChannelList = ref<Chanel[]>([]);

getAudioStatus(properties.guild.id).then((value) => {
  status.value = value;
  loading.value = false;
});

const progress = computed(() => {
  if (
    !status.value.connected ||
    !status.value.canView ||
    status.value.playBackInfo?.stopped
  ) {
    return 0;
  } else {
    if (
      status.value.playBackInfo &&
      status.value.playBackInfo?.progress &&
      status.value.playBackInfo?.trackInfo?.detail.length
    ) {
      return (
        (status.value.playBackInfo?.progress /
          status.value.playBackInfo?.trackInfo?.detail.length) *
        100
      );
    } else {
      return 0;
    }
  }
});

const actionBtnDisable = computed(() => {
  return (
    !status.value.connected ||
    !status.value.canInteract ||
    status.value.playBackInfo?.stopped
  );
});
const connectBtnDisable = computed(() => {
  return status.value.connected && !status.value.canInteract;
});

const playPauseIcon = computed(() => {
  return status.value.playBackInfo?.paused ? "mdi-play" : "mdi-pause";
});

const currentProgress = computed(() => {
  if (
    !status.value.connected ||
    !status.value.canView ||
    !status.value.playBackInfo?.progress
  ) {
    return "--:--";
  }
  return timeToMMSS(status.value.playBackInfo.progress);
});

const totalTime = computed(() => {
  if (
    !status.value.connected ||
    !status.value.canView ||
    !status.value.playBackInfo?.trackInfo?.detail.length
  ) {
    return "--:--";
  }
  return timeToMMSS(status.value.playBackInfo?.trackInfo?.detail.length);
});

const privateChan = computed(() => {
  return status.value.connected && !status.value.canView;
});

function timeToMMSS(time: number) {
  let seconds = Math.floor(time / 1000);
  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return `${minutes}:${("0" + seconds).slice(-2)}`;
}

watch(chanListMenuOpen, (value) => {
  if (value) {
    chanListLoading.value = true;
    voiceChannelList.value = [];
    getVoiceChannels(properties.guild.id).then((value) => {
      voiceChannelList.value = value;
      chanListLoading.value = false;
    });
  }
});

function voiceChannelSelected(value: string[]) {
  if (value[0] != status.value.channel?.id) {
    connect(properties.guild.id, value[0]);
  }
}

const selectedListVoice = computed(() => {
  return [status.value.channel?.id as string];
});

let interval = setInterval(() => {
  getAudioStatus(properties.guild.id).then((value) => {
    status.value = value;
  });
}, 1000);

onBeforeRouteUpdate(() => {
  clearInterval(interval);
});
</script>

<style scoped></style>

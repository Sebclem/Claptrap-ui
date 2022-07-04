<template>
  <div>
    <v-row v-if="!userStore.isLoggedIn">
      <v-col cols="12" md="6">
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card>
              <v-card-title>
                <v-badge
                  location="bottom end"
                  color="success"
                  bordered
                  offset-x="10"
                  offset-y="10"
                >
                  <v-avatar size="100">
                    <v-img src="/icon.png" max-height="30vh" />
                  </v-avatar>
                </v-badge>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col class="d-flex flex-row">
                    <h2>Claptrap Bot</h2>
                    <h2 class="text-disabled">#4815</h2>
                    <v-chip
                      class="ml-2"
                      size="x-small"
                      label
                      color="blue-darken-1"
                      variant="flat"
                      prepend-icon="mdi-check"
                    >
                      Bot
                    </v-chip>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <h3 class="text-secondary">About me</h3>
                    <p class="text-secondary">Claptrap bot at your service !</p>
                    <p class="text-secondary">
                      Setup
                      <v-icon>mdi-arrow-right</v-icon>
                      <a href="/">claptrapbot.com</a>
                    </p>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn :href="inviteLinkStore.inviteLink" color="primary">
                      Invite me !
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-5">
          <v-col cols="6" class="text-center">
            Login to have access to your servers
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="6">
            <v-btn
              to="/oauth2/redirect"
              prepend-icon="mdi-discord"
              color="primary"
            >
              Login with Discord
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col class="text-center">
            <v-card>
              <v-card-title>
                <v-scroll-x-transition group>
                  <v-row
                    v-for="(item, index) in messages"
                    :key="index"
                    v-show="item.show"
                  >
                    <v-col cols="2" sm="1" md="2" xl="1">
                      <v-avatar size="large">
                        <v-img src="/icon.png" />
                      </v-avatar>
                    </v-col>
                    <v-col class="px-0 py-2" cols="10" sm="1" md="10" xl="11">
                      <v-row justify="left">
                        <v-col class="d-flex align-center">
                          <p class="text-primary">Claptrap Bot</p>
                          <span class="text-disabled text-caption ml-2">
                            just now
                          </span>
                        </v-col>
                      </v-row>
                      <v-row justify="left" class="mb-2">
                        <v-col
                          class="d-flex flex-column justify-start text-start pt-0 text-body-2 pb-0"
                          cols="12"
                          v-for="(text, textIndex) in item.lines"
                          :key="textIndex"
                          style="white-space: normal"
                        >
                          {{ text }}
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-scroll-x-transition>
                <v-row v-if="typing">
                  <v-col class="text-disabled text-caption text-left">
                    Claptrap Bot is typing ...
                  </v-col>
                </v-row>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
import { getInviteLink } from "@/services/guildService";
import { useInviteLinkStore } from "@/stores/inviteLink";
import { useMutualGuildsStore } from "@/stores/mutualGuilds";
import { useUserStore } from "@/stores/user";
import { onBeforeMount, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const inviteLinkStore = useInviteLinkStore();

const messages = ref([
  {
    show: true,
    lines: ["Hi i'm Claptrap Bot, let me help you with your server !"],
  },
  {
    show: false,
    lines: [
      "A little list of all I can do:",
      "- 🎉 Welcome message: Greet your new members with the perfect message !",
      "- 📇 Default role: All newcomer will receive this role !",
      "- 🔊 Temporary voice channel: Auto create temporary voice channel !",
      "- 🔊 Audio Bot: Play your favorite playlist on voice channel !",
      "- 🔞 Madame Command: NSFW command that get random picture from bonjourmadame.fr, and a daily surprise can be enable 😉",
      "- 📄 Web page: You can control the audio bot and change all the settings here, goodbye endless commands !",
    ],
  },
  {
    show: false,
    lines: ["And more to come !"],
  },
  {
    show: false,
    lines: [
      "So what are you waiting for ?!",
      "Login now and invite me on your server !",
    ],
  },
]);

const typing = ref(true);

let interval = setInterval(() => {
  let changed = false;
  for (const item of messages.value) {
    if (!item.show) {
      item.show = true;
      changed = true;
      break;
    }
  }
  if (!changed) {
    clearInterval(interval);
    interval = -1;
    typing.value = false;
  }
}, 1500);

onBeforeUnmount(() => {
  if (interval != -1) {
    clearInterval(interval);
  }
});

onBeforeMount(async () => {
  const mutualGuildStore = useMutualGuildsStore();
  if (userStore.isLoggedIn) {
    if (!mutualGuildStore.lastGuildId) {
      mutualGuildStore.lastGuildId = mutualGuildStore.guilds[0]?.id;
    }
    if (mutualGuildStore.lastGuildId) {
      router.push({
        name: "guildHome",
        params: { guildId: mutualGuildStore.lastGuildId },
      });
    }
  } else {
    const inviteLink = await getInviteLink();
    inviteLinkStore.inviteLink = inviteLink.link;
  }
});
//
</script>

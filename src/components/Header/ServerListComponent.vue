<template>
  <v-list nav>
    <v-fab-transition group>
      <template v-if="loaded">
        <v-list-item
          v-for="guild of guilds"
          :key="guild.id"
          :value="guild.id"
          active-color="yellow"
          :to="`/guild/${guild.id}`"
        >
          <v-list-item-avatar
            start
            :color="guild.iconUrl ? '' : 'grey-darken-3'"
          >
            <v-img v-if="guild.iconUrl" :src="guild.iconUrl"></v-img>
            <template v-if="!guild.iconUrl">{{ guild.name[1] }}</template>
          </v-list-item-avatar>
          <v-list-item-title>{{ guild.name }}</v-list-item-title>
        </v-list-item>
        <v-list-item :href="inviteLink" target="_blank">
          <v-list-item-avatar color="grey-darken-3" start>
            <v-icon color="green">mdi-plus</v-icon>
          </v-list-item-avatar>
          <v-list-item-title> Invite Claptrap Bot ! </v-list-item-title>
        </v-list-item>
      </template>
      <v-list-item v-if="!loaded">
        <v-list-item-avatar>
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-list-item-avatar>
        <v-list-item-subtitle> Loading... </v-list-item-subtitle>
      </v-list-item>
    </v-fab-transition>
  </v-list>
</template>

<script setup lang="ts">
import { getInviteLink } from "@/services/guildService";
import { useInviteLinkStore } from "@/stores/inviteLink";
import { useMutualGuildsStore } from "@/stores/mutualGuilds";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";

const inviteLinkStore = useInviteLinkStore();

const { inviteLink } = storeToRefs(inviteLinkStore);

const mutualGuildsStore = useMutualGuildsStore();
const { guilds, loaded } = storeToRefs(mutualGuildsStore);
onBeforeMount(async () => {
  if (!inviteLinkStore.isPresent) {
    let inviteLink = await getInviteLink();
    inviteLinkStore.inviteLink = inviteLink.link;
  }
});
</script>

<style scoped></style>

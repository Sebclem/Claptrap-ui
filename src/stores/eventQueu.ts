import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

interface Event {
  uuid: string | undefined;
  type: string;
  text: string;
}

export const useEventQueuStore = defineStore({
  id: "eventQueu",
  state: () => ({
    events: [] as Array<Event>,
  }),
  getters: {
    size: (state) => {
      return state.events.length;
    },
  },
  actions: {
    shift(): Event | undefined {
      return this.events.shift();
    },
    push(event: Event) {
      if (!event.uuid) {
        event.uuid = uuidv4();
      }
      this.events.push(event);
    },
  },
});

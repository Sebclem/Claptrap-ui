import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    name: null,
    discordId: null,
    token: null
  }),
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})

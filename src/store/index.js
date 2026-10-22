import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    error: null,
  }),
  actions: {
    setError(error) {
      this.error = error
    },
    clearError() {
      this.error = null
    },
    async fetchCurrency() {
      const key = import.meta.env.VITE_EXCHANGERATE_API_KEY
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/${key}/latest/EUR`,
      )
      return await res.json()
    },
  },
})

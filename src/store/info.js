import { defineStore } from 'pinia'
import { useAppStore } from './index'
import { useAuthStore } from './auth'
import firebase from 'firebase/compat/app'
import { defaultLocale } from '../locales'

export const useInfoStore = defineStore('info', {
  state: () => ({
    info: {
      locale: defaultLocale,
    },
  }),
  actions: {
    setInfo(info) {
      this.info = info
    },
    clearInfo() {
      this.info = { locale: this.info.locale }
    },
    async updateInfo(toUpdate) {
      try {
        const uid = useAuthStore().getUid()
        const updateData = { ...this.info, ...toUpdate }
        await firebase.database().ref(`/users/${uid}/info`).update(updateData)
        this.setInfo(updateData)
      } catch (e) {
        useAppStore().setError(e)
        throw e
      }
    },
    async fetchInfo() {
      try {
        const uid = useAuthStore().getUid()
        const info = (
          await firebase.database().ref(`/users/${uid}/info`).once('value')
        ).val()
        this.setInfo(info)
      } catch (e) {
        useAppStore().setError(e)
        throw e
      }
    },
  },
})

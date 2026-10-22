import { defineStore } from 'pinia'
import { useAppStore } from './index'
import { useInfoStore } from './info'
import firebase from 'firebase/compat/app'
import { defaultLocale } from '../locales'

export const useAuthStore = defineStore('auth', {
  actions: {
    async login({ email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        useAppStore().setError(e)
        throw e
      }
    },
    async register({ email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = this.getUid()
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 0,
          locale: defaultLocale,
          name,
        })
      } catch (e) {
        useAppStore().setError(e)
        throw e
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout() {
      await firebase.auth().signOut()
      useInfoStore().clearInfo()
    },
  },
})

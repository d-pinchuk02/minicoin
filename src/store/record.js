import { defineStore } from 'pinia'
import { useAppStore } from './index'
import { useAuthStore } from './auth'
import firebase from 'firebase/compat/app'

export const useRecordStore = defineStore('record', {
  actions: {
    async createRecord(record) {
      try {
        const uid = useAuthStore().getUid()
        return await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .push(record)
      } catch (e) {
        useAppStore().setError(e)
        throw e
      }
    },
    async fetchRecords() {
      try {
        const uid = useAuthStore().getUid()
        const records =
          (
            await firebase.database().ref(`/users/${uid}/records`).once('value')
          ).val() || []

        return Object.keys(records).map((key) => ({ ...records[key], id: key }))
      } catch (e) {
        useAppStore().setError(e)
        throw e
      }
    },
    async fetchRecordById(id) {
      try {
        const uid = useAuthStore().getUid()
        const record =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .child(id)
              .once('value')
          ).val() || []

        return { ...record, id }
      } catch (e) {
        useAppStore().setError(e)
        throw e
      }
    },
  },
})

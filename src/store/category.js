import { defineStore } from 'pinia'
import { useAppStore } from './index'
import { useAuthStore } from './auth'
import firebase from 'firebase/compat/app'

export const useCategoryStore = defineStore('category', {
  actions: {
    async fetchCategories() {
      try {
        const uid = useAuthStore().getUid()
        const categories =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .once('value')
          ).val() || []

        return Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }))
      } catch (e) {
        useAppStore().setError(e)
        throw e
      }
    },
    async fetchCategoryById(id) {
      try {
        const uid = useAuthStore().getUid()
        const category =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .child(id)
              .once('value')
          ).val() || []

        return { ...category, id }
      } catch (e) {
        useAppStore().setError(e)
        throw e
      }
    },
    async updateCategory({ id, title, limit }) {
      try {
        const uid = useAuthStore().getUid()
        await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({ title, limit })
      } catch (e) {
        useAppStore().setError(e)
        throw e
      }
    },
    async createCategory({ title, limit }) {
      try {
        const uid = useAuthStore().getUid()
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({ title, limit })

        return { title, limit, id: category.key }
      } catch (e) {
        useAppStore().setError(e)
        throw e
      }
    },
  },
})

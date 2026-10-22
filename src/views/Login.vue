<template>
  <v-card class="elevation-3">
    <v-toolbar flat>
      <v-toolbar-title>{{ title('login.title') }}</v-toolbar-title>
      <locale-select activator-class="ml-auto" :activator-large="false" />
    </v-toolbar>
    <v-card-text>
      <v-form ref="form" v-model="isValid" @submit.prevent="submitHandler">
        <v-text-field
          :label="localizeFilter('shared.email')"
          :rules="emailRules"
          color="orange"
          name="email"
          :prepend-icon="mdiAt"
          type="email"
          v-model.trim="email"
          required
        ></v-text-field>

        <v-text-field
          :label="localizeFilter('shared.password')"
          :rules="passwordRules"
          color="orange"
          name="password"
          :prepend-icon="mdiLock"
          type="password"
          v-model.trim="password"
          required
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions class="pa-4">
      <v-btn color="orange" to="register" variant="outlined">
        <v-icon :icon="mdiAccountPlus" start />
        {{ localizeFilter('shared.signup') }}...
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn @click.prevent="submitHandler" color="orange" :disabled="!isValid">
        <v-icon :icon="mdiLogin" start />
        {{ localizeFilter('shared.signin') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mdiAt, mdiLock, mdiAccountPlus, mdiLogin } from '@mdi/js'
import { useAuthStore } from '@/store/auth'
import { useInfoStore } from '@/store/info'
import localizeFilter from '@/filters/localize.filter'
import LocaleSelect from '@/components/app/LocaleSelect.vue'
import title from '@/utils/title'
import { useMessage } from '@/composables/useMessage'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const infoStore = useInfoStore()
const { info: showInfo } = useMessage()
const form = ref(null)
const email = ref('')
const password = ref('')
const isValid = ref(false)
const emailRules = [
  (v) => !!v || localizeFilter('shared.error.enterEmail'),
  (v) =>
    /^\S+@\S+\.\S+$/.test(v) ||
    localizeFilter('shared.error.enterCorrectEmail'),
]

const passwordRules = [
  (v) => !!v || localizeFilter('shared.error.enterPassword'),
  (v) =>
    (v && v.length >= 8) || localizeFilter('shared.error.minLength') + ': ' + 8,
]

onMounted(() => {
  if (route.query.locale) {
    infoStore.setInfo({ locale: route.query.locale })
  }
  if (route.query.message) {
    showInfo(localizeFilter('msg.' + route.query.message))
  }
})

async function submitHandler() {
  const { valid } = await form.value.validate()
  if (!valid) return
  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    })
    await infoStore.fetchInfo()
    router.push('/dashboard')
  } catch {}
}
</script>

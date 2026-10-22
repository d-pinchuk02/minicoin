<template>
  <v-card class="elevation-3">
    <v-toolbar flat>
      <v-toolbar-title>{{ title('register.title') }}</v-toolbar-title>
      <locale-select
        activator-class="ml-auto"
        activator-outlined
        :activator-large="false"
      />
    </v-toolbar>
    <v-card-text>
      <v-form ref="form" v-model="isValid" @submit.prevent="submitHandler">
        <v-text-field
          :label="localizeFilter('shared.email')"
          :rules="emailRules"
          color="orange"
          name="email"
          prepend-icon="mdi-at"
          type="email"
          v-model.trim="email"
          required
        ></v-text-field>

        <v-text-field
          :label="localizeFilter('shared.password')"
          :rules="passwordRules"
          color="orange"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          v-model.trim="password"
          required
        ></v-text-field>

        <v-text-field
          :label="localizeFilter('shared.name')"
          :rules="nameRules"
          color="orange"
          name="name"
          prepend-icon="mdi-format-letter-case"
          type="name"
          v-model.trim="name"
          required
        ></v-text-field>

        <v-checkbox
          :label="localizeFilter('register.agree')"
          color="orange"
          v-model="agree"
        ></v-checkbox>
      </v-form>
    </v-card-text>
    <v-card-actions class="pa-4">
      <v-btn color="orange" to="login" variant="outlined">
        <v-icon start>mdi-login</v-icon>
        {{ localizeFilter('shared.signin') }}...
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        @click.prevent="submitHandler"
        color="orange"
        :disabled="!isValid || !agree"
      >
        <v-icon start>mdi-account-plus</v-icon>
        {{ localizeFilter('shared.signup') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import localizeFilter from '@/filters/localize.filter'
import LocaleSelect from '@/components/app/LocaleSelect.vue'
import title from '@/utils/title'

const router = useRouter()
const authStore = useAuthStore()
const form = ref(null)
const email = ref('')
const password = ref('')
const name = ref('')
const agree = ref(false)
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

const nameRules = [
  (v) => !!v || localizeFilter('shared.error.enterName'),
  (v) =>
    (v && v.length >= 2) || localizeFilter('shared.error.minLength') + ': ' + 2,
]

async function submitHandler() {
  const { valid } = await form.value.validate()
  if (!valid || !agree.value) return
  try {
    await authStore.register({
      email: email.value,
      password: password.value,
      name: name.value,
    })
    router.push('/dashboard')
  } catch {}
}
</script>

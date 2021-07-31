<template>
  <v-card class="elevation-3">
    <v-toolbar flat>
      <v-toolbar-title>{{ this.$title('register.title') }}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form v-model="isValid" @submit.prevent="submitHandler">
        <v-text-field
          :label="'shared.email' | localize"
          :rules="emailRules"
          name="email"
          prepend-icon="mdi-at"
          type="email"
          v-model.trim="email"
          required
        ></v-text-field>

        <v-text-field
          :label="'shared.password' | localize"
          :rules="passwordRules"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          v-model.trim="password"
          required
        ></v-text-field>

        <v-text-field
          :label="'shared.name' | localize"
          :rules="nameRules"
          name="name"
          prepend-icon="mdi-format-letter-case"
          type="name"
          v-model.trim="name"
          required
        ></v-text-field>

        <v-checkbox
          :label="'register.agree' | localize"
          v-model="agree"
        ></v-checkbox>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        to="login"
        text
      >{{'shared.signin' | localize}}</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        @click.prevent="submitHandler"
        color="primary"
        :disabled="!isValid || !agree"
      >{{'shared.signup' | localize}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'register',
  metaInfo() {
    return {
      title: this.$title('register.title')
    }
  },
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false,
    isValid: false,
    emailRules: [ 
      v => !!v || localizeFilter('shared.errors.enterEmail'),
      v => /^\S+@\S+\.\S+$/.test(v) || localizeFilter('shared.errors.enterCorrectEmail')
    ],
    passwordRules: [ 
      v => !!v || localizeFilter('shared.errors.enterPassword'),
      v => (v && v.length >= 8) || localizeFilter('shared.errors.minLength') + ': ' + 8
    ],
    nameRules: [
      v => !!v || localizeFilter('shared.errors.enterName'),
      v => (v && v.length >= 2) || localizeFilter('shared.errors.minLength') + ': ' + 2
    ]
  }),
  methods: {
    async submitHandler() {
      if(!this.isValid || !this.agree) {
        console.log('invalid')
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>

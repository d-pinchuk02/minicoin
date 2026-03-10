<template>
  <v-menu offset-y :class="menuClass">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :large="activatorLarge"
        :class="activatorClass"
        :color="activatorColor"
        :dark="activatorDark"
        :outlined="activatorOutlined"
        :small="!activatorLarge"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>mdi-translate</v-icon>
        {{ languages.find(lang => lang.id === info.locale)?.name }}
      </v-btn>
    </template>
    <v-list :class="listClass">
      <v-list-item
        v-for="lang in languages"
        :key="lang.id"
        @click="setLanguage(lang.id)"
      >
        <v-list-item-title>{{ lang.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { localesArray } from '../../locales'

export default {
  name: 'LocaleSelect',
  props: {
    menuClass: {
      type: String,
      default: ''
    },
    activatorClass: {
      type: String,
      default: ''
    },
    activatorColor: {
      type: String,
      default: 'light'
    },
    activatorDark: {
      type: Boolean,
      default: false
    },
    activatorOutlined: {
      type: Boolean,
      default: false
    },
    activatorLarge: {
      type: Boolean,
      default: true
    },
    listClass: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    languages: localesArray,
  }),
  computed: {
    ...mapGetters(['info']),
  },
  methods: {
    setLanguage(code) {
      this.$store.commit("setInfo", { ...this.info, locale: code })
    }
  }
}
</script>

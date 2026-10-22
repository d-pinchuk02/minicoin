<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <v-row class="align-center justify-center">
          <v-col cols="12" md="6" class="text-center text-md-left">
            <h1 class="hero-title font-weight-bold mb-4 text-white">
              {{ localizeFilter('landing.hero.title') }}
            </h1>
            <p class="hero-subtitle mb-6 text-white opacity-8">
              {{ localizeFilter('landing.hero.subtitle') }}
            </p>
            <div class="d-flex justify-center justify-md-start gap-3 flex-column flex-sm-row">
              <v-btn
                size="large"
                variant="outlined"
                color="white"
                to="/register"
              >
                <v-icon start>mdi-account-plus</v-icon>
                {{ localizeFilter('shared.signup') }}
              </v-btn>
              <v-btn
                size="large"
                color="grey-darken-4"
                to="/login"
              >
                <v-icon start>mdi-login</v-icon>
                {{ localizeFilter('shared.signin') }}
              </v-btn>
              <locale-select activator-class="ml-md-auto" />
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="text-center">
              <v-icon size="300" color="white" class="opacity-8">
                mdi-wallet
              </v-icon>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import localizeFilter from '@/filters/localize.filter'
import LocaleSelect from '@/components/app/LocaleSelect.vue'

export default {
  name: 'landing',
  components: {
    LocaleSelect
  },
  computed: {
    ...mapGetters(['info']),
  },
  mounted() {
    if (this.$route.query.locale) {
      let info = { ...this.info, locale: this.$route.query.locale }
      this.$store.commit("setInfo", info)
    }
  },
  methods: {
    localizeFilter,
  },
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #FF8C00 0%, #FF6F00 100%);
  color: white;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.gap-3 {
  gap: 12px;
}
</style>

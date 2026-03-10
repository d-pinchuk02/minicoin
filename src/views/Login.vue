<template>
  <v-card class="elevation-3">
    <v-toolbar flat>
      <v-toolbar-title>{{ this.$title("login.title") }}</v-toolbar-title>
      <locale-select
        activator-class="ml-auto"
        activator-outlined
        :activator-large="false"
      />
    </v-toolbar>
    <v-card-text>
      <v-form v-model="isValid" @submit.prevent="submitHandler">
        <v-text-field
          :label="'shared.email' | localize"
          :rules="emailRules"
          color="orange"
          name="email"
          prepend-icon="mdi-at"
          type="email"
          v-model.trim="email"
          required
        ></v-text-field>

        <v-text-field
          :label="'shared.password' | localize"
          :rules="passwordRules"
          color="orange"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          v-model.trim="password"
          required
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions class="pa-4">
      <v-btn
        color="orange"
        to="register"
        outlined
      >
        <v-icon left>mdi-account-plus</v-icon>
        {{ "shared.signup" | localize }}...
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        @click.prevent="submitHandler"
        color="orange"
        :disabled="!isValid"
      >
        <v-icon left>mdi-login</v-icon>
        {{ "shared.signin" | localize }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";
import LocaleSelect from "../components/app/LocaleSelect.vue";

export default {
  name: "login",
  metaInfo() {
    return {
      title: this.$title("login.title")
    };
  },
  data: () => ({
    email: "",
    password: "",
    isValid: true,
    emailRules: [
      v => !!v || localizeFilter("shared.errors.enterEmail"),
      v =>
        /^\S+@\S+\.\S+$/.test(v) ||
        localizeFilter("shared.errors.enterCorrectEmail")
    ],
    passwordRules: [
      v => !!v || localizeFilter("shared.errors.enterPassword"),
      v =>
        (v && v.length >= 8) ||
        localizeFilter("shared.errors.minLength") + ": " + 8
    ]
  }),
  mounted() {
    if (this.$route.query.locale) {
      let info = { locale: this.$route.query.locale };
      this.$store.commit("setInfo", info);
    }

    if (this.$route.query.message) {
      this.$info(localizeFilter("msg." + this.$route.query.message));
    }
  },
  methods: {
    async submitHandler() {
      if (!this.isValid) {
        console.log("invalid");
        return;
      }

      const formData = {
        email: this.email,
        password: this.password
      };

      try {
        await this.$store.dispatch("login", formData);
        await this.$store.dispatch("fetchInfo");
        this.$router.push("/dashboard");
      } catch (e) {}
    }
  },
  components: {
    LocaleSelect,
  }
};
</script>

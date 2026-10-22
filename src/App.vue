<template>
  <component :is="layout" />
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import LandingLayout from "@/layouts/LandingLayout.vue";

export default {
  computed: {
    layout() {
      return { empty: EmptyLayout, main: MainLayout, landing: LandingLayout }[this.$route.meta.layout || "empty"];
    }
  },
  components: {
    EmptyLayout,
    MainLayout,
    LandingLayout,
  },
  watch: {
    $route: {
      handler(to) {
        this.setDocumentTitle(to);
      },
      immediate: true
    }
  },
  methods: {
    setDocumentTitle(route) {
      const titleKey = route.meta && route.meta.titleKey;
      document.title = titleKey ? this.$title(titleKey) : import.meta.env.VITE_TITLE;
    }
  }
};
</script>

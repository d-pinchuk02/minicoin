<template>
  <v-navigation-drawer
      app
      clipped
      color="grey lighten-4"
      :value="value"
    >
    <v-list
        dense
        nav
    >
      <v-list-item
        v-for="item in links"
        :key="item.title"
        :to="item.to"
        router
        exact
      >
        <v-list-item-icon>
          <v-icon right>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  props: ['value'],
  data: () => ({
    links: [
      { 
        title: localizeFilter('sidebar.bill'), 
        icon: 'mdi-currency-usd',
        to: '/dashboard' 
      },
      { 
        title: localizeFilter('sidebar.history'), 
        icon: 'mdi-history',
        to: '/history'
      },
      { 
        title: localizeFilter('sidebar.planning'), 
        icon: 'mdi-trending-up',
        to: '/planning'
      },
      { 
        title: localizeFilter('sidebar.record'), 
        icon: 'mdi-plus',
        to: '/record'
      },
      { 
        title: localizeFilter('sidebar.categories'), 
        icon: 'mdi-shape',
        to: '/categories'
      }
    ]
  })
}
</script>

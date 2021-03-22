<template>
  <v-list flat>
    <v-list-item
      v-for="item in items"
      :key="item.title"
      :to="item.to"
      link
      dense
      color="primary"
      :active="$nuxt.$route.name === 'item.title'"
    >
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'NavDrawer',
  data () {
    return {
      items: [
        {
          icon: 'mdi-view-dashboard-outline',
          title: 'Dashboard',
          to: '/dashboard'
        },
        {
          icon: 'mdi-email-outline',
          title: 'Messages',
          to: '/messages'
        },
        {
          icon: 'mdi-clipboard-outline',
          title: 'Organization',
          to: '/organization'
        },

        {
          icon: 'mdi-cog-outline',
          title: 'Settings',
          to: '/settings'
        }
      ]
    }
  }
}
</script>

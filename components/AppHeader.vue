<template>
  <v-app-bar
    app
    flat
  >
    <v-btn
      v-if="!drawer"
      icon
      @click.stop="$emit('open')"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <h1 class="title">
      {{ $nuxt.$route.name | capitalize }}
    </h1>

    <v-spacer />
    <div class="text-center">
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar
              color="primary"
              size="36"
            >
              <span class="white--text">{{ user.username | user_initial }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list
          dense
          class="py-0"
        >
          <template v-if="user.organization.length > 0">
            <v-list-item
              v-for="item in user.organization"
              :key="item._id"
              dense
              flat
            >
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </template>
          <v-list-item v-else>
            <v-list-item-title class="grey--text pr-1">
              <i>No Organization found</i>
            </v-list-item-title>
          </v-list-item>
        </v-list>
        <v-divider />
        <v-list
          dense
          class="py-0"
        >
          <v-list-item
            v-for="(item, index) in menu"
            :key="index"
            dense
            flat
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-divider />
        <v-list
          dense
          class="py-0"
        >
          <v-list-item
            dense
            @click="logout()"
          >
            <v-list-item-title>
              Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppHeader',
  props: {
    drawer: {
      type: Boolean
    }
  },
  data () {
    return {
      menu: [
        { title: 'Profile' },
        { title: 'Settings' }
      ]
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

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
              <span class="white--text">FX</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list
          dense
          class="py-0"
        >
          <v-list-item
            v-for="item in organization"
            :key="item._id"
            dense
            flat
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
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
export default {
  name: 'AppHeader',
  props: {
    drawer: {
      type: Boolean
    }
  },
  data () {
    return {
      organization: [
        {
          _id: 1,
          name: 'Organization 1'
        },
        {
          _id: 2,
          name: 'Organization 2'
        }
      ],
      menu: [
        { title: 'Profile' },
        { title: 'Settings' }
      ]
    }
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

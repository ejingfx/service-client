<template>
  <v-app id="service-tracker-client">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped-left
      dark
      fixed
      mobile-breakpoint="960"
    >
      <v-list>
        <v-list-item>
          <v-list-item-icon class="mr-5">
            <v-avatar
              color="indigo"
              size="36"
            >
              <span class="white--text">FX</span>
            </v-avatar>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Full Name</v-list-item-title>
            <v-list-item-subtitle>email@domain.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

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

      <v-divider />

      <v-list>
        <v-list-group>
          <template #activator>
            <v-list-item-content>
              <v-list-item-title>Favorites</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="item in favorites"
            :key="item.title"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-divider />

        <v-list-group>
          <template #activator>
            <v-list-item-content>
              <v-list-item-title>Pages</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="item in pages"
            :key="item.title"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-divider />

        <v-list-group>
          <template #activator>
            <v-list-item-content>
              <v-list-item-title>Forms</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="item in forms"
            :key="item.title"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <template #append>
        <v-divider />
        <v-list
          dense
          class="py-0"
        >
          <v-list-item
            link
          >
            <v-list-item-content class="text-center">
              <v-list-item-title class="ml-n4">
                <v-icon small inline>
                  mdi-plus
                </v-icon>
                Invite to Collaborate
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      app
      flat
    >
      <v-btn
        v-if="!drawer"
        icon
        @click.stop="drawer = !drawer; mini = !mini"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <h1 class="title">
        {{ $nuxt.$route.name | capitalize }}
      </h1>

      <v-spacer />

      <v-responsive max-width="240">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
        />
      </v-responsive>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Dashboard',
      logo: require('static/images/logo.jpg'),
      drawer: true,
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
          title: 'Tickets',
          to: '/tickets'
        },
        {
          icon: 'mdi-account-outline',
          title: 'Profile',
          to: '/profile'
        },
        {
          icon: 'mdi-cog-outline',
          title: 'Settings',
          to: '/settings'
        }
      ],
      favorites: [],
      pages: [],
      forms: []
    }
  },
  head: {
    title: 'Service | Dashboard'
  }
}
</script>

<style lang="scss">
.sfi {
  font-size: 19px;
}
</style>

<template>
  <v-app-bar
    app
    color="white"
  >
    <v-btn
      v-if="!drawer"
      icon
      @click.stop="$emit('open')"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <v-spacer />

    <AppSearch />

    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          color="gray"
          outlined
          class="ml-3"
          small
          v-bind="attrs"
          v-on="on"
        >
          <v-avatar>
            <v-icon small color="gray">
              mdi-plus
            </v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <v-list
        flat
        style="min-width: 160px;"
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
          dense
          color="primary"
        >
          <v-list-item-icon class="mr-2">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn
      icon
      color="gray"
      outlined
      small
      class="ml-3"
    >
      <v-avatar>
        <span class="gray--text">
          ?
        </span>
      </v-avatar>
    </v-btn>

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
              size="28"
            >
              <span class="white--text">{{ user.username | user_initial }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list
          dense
          class="py-0"
          style="min-width: 160px;"
        >
          <template v-if="user.workspace !== ''">
            <v-list-item
              v-for="(item, i) in organizations"
              :key="i"
              dense
              flat
              @click.stop="setWorkspace(item)"
            >
              <v-list-item-title>{{ item.name | capitalize }}</v-list-item-title>
              <v-list-item-action>
                <v-icon
                  v-if="item._id === user.workspace"
                  small
                >
                  mdi-check
                </v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>
          <v-list-item v-else>
            <v-list-item-title class="grey--text pr-1">
              <i>No Selected Workspace</i>
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
            class="no-hover"
            @click="$router.push(item.link)"
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
            class="no-hover"
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
import AppSearch from '@/components/AppSearch'
import { snackbar } from '@/constants'

export default {
  name: 'AppHeader',
  components: {
    AppSearch
  },
  props: {
    drawer: {
      type: Boolean
    }
  },
  data () {
    return {
      rbac: 'user',
      items: [
        {
          icon: 'mdi-clipboard-outline',
          title: 'Ticket'
        },
        {
          icon: 'mdi-email-outline',
          title: 'Message'
        },
        {
          icon: 'mdi-account-outline',
          title: 'Invite'
        }
      ],
      menu: [
        {
          title: 'Profile',
          link: '/settings/profile'
        },
        {
          title: 'Settings',
          link: '/settings'
        }
      ],
      snackbar
    }
  },
  computed: {
    ...mapState([
      'user',
      'organizations'
    ])
  },
  methods: {
    getWorkspace (id) {
      return this.organizations
        .filter(item => item._id === id)[0].name
    },
    async setWorkspace (item) {
      await this.$api
        .setWorkspace(this.user.id, item._id)
        .then(response => {
          if (response.data) {
            const cookiePayload = {
              $cookies: this.$cookies,
              data: {
                key: 'workspace',
                value: response.data
              }
            }
            this.$store.dispatch('SET_WORKSPACE', response.data)
            this.$store.dispatch('COOKIE_UPDATE', cookiePayload)
            this.$store.dispatch('SET_SNACKBAR', {
              snackbar: {
                ...snackbar.saved,
                ...{ message: 'Switching Workspace' }
              }
            })
          } else if (response.errors) {
            this.$store.dispatch('SET_SNACKBAR', {
              snackbar: {
                ...snackbar.error,
                ...{ message: response.errors }
              }
            })
          }
        })
    },
    logout () {
      this.$store.commit('logout')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

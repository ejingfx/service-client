<template>
  <v-app id="service-tracker-client">
    <v-navigation-drawer
      v-if="authenticated"
      id="drawer-group-container"
      v-model="drawer"
      app
      clipped-left
      dark
      fixed
      mobile-breakpoint="1200"
    >
      <div id="drawer-group">
        <div id="drawer-group-top">
          <UserInfoDrawer />
          <v-divider />
          <NavDrawer />
          <v-divider />
        </div>

        <div id="drawer-group-bottom">
          <v-list>
            <FavoritesDrawer />
            <v-divider />
            <PagesDrawer />
            <v-divider />
            <FormsDrawer />
          </v-list>
        </div>
      </div>

      <template #append>
        <v-divider />
        <Invite id="drawer-group-append" />
      </template>
    </v-navigation-drawer>

    <AppHeader
      v-if="authenticated"
      :drawer="drawer"
      @open="drawer = !drawer"
    />

    <v-main class="grey lighten-3">
      <v-container
        :class="($route.name === 'login' || $route.name === 'register') ? 'fill-height' : 'container--fluid'"
      >
        <nuxt class="px-1" />
      </v-container>
    </v-main>

    <v-navigation-drawer
      v-if="authenticated & drawerInfo"
      id="drawer-info-container"
      v-model="drawerInfo"
      width="40%"
      fixed
      clipped
      right
      mobile-breakpoint="1200"
    >
      asdf
    </v-navigation-drawer>

    <v-snackbar
      v-model="snackbar.show"
      timeout="-1"
      :color="snackbar.color"
      fixed
      bottom
      text
      multi-line
    >
      {{ snackbar.message | format_snackbar }}
      <template #action="{ attrs }">
        <v-btn
          :color="snackbar.color"
          icon
          text
          v-bind="attrs"
          @click="dismiss"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import AppHeader from '@/components/AppHeader'
import UserInfoDrawer from '@/components/UserInfoDrawer'
import NavDrawer from '@/components/NavDrawer'
import FavoritesDrawer from '@/components/FavoritesDrawer'
import PagesDrawer from '@/components/PagesDrawer'
import FormsDrawer from '@/components/FormsDrawer'
import Invite from '@/components/Invite'

export default {
  name: 'default',
  components: {
    AppHeader,
    UserInfoDrawer,
    NavDrawer,
    FavoritesDrawer,
    PagesDrawer,
    FormsDrawer,
    Invite
  },
  data () {
    return {
      drawer: true,
      drawerInfo: false,
      drawerTracker: {
        group: 0,
        top: 0,
        bottom: 0,
        append: 0
      }
    }
  },
  head: {
    title: 'Login'
  },
  computed: {
    ...mapState([
      'authenticated',
      'snackbar'
    ]),
    getDrawerTracker () { return this.drawerTracker }
  },
  mounted () {
    this.drawerGroupHandler()
  },
  methods: {
    dismiss () {
      this.$store.dispatch('DISMISS_SNACKBAR')
    },
    setDrawerTracker (val) {
      this.drawerTracker = { ...val }
      this.resizeDrawer()
    },
    resizeDrawer () {
      if (process.browser && this.authenticated) {
        const containerHeight = this.getDrawerTracker.group - this.getDrawerTracker.append - 4
        const targetHeight = this.getDrawerTracker.group - this.getDrawerTracker.top - this.getDrawerTracker.append - 4

        document.getElementById('drawer-group')
          .style.height = `${containerHeight}px`
        document.getElementById('drawer-group-bottom')
          .style.height = `${targetHeight}px`
      }
    },
    drawerGroupHandler () {
      const setDrawerTracker = this.setDrawerTracker
      if (process.browser && this.authenticated) {
        const obj = {
          group: document.getElementById('drawer-group-container').clientHeight,
          top: document.getElementById('drawer-group-top').clientHeight,
          bottom: document.getElementById('drawer-group-bottom').clientHeight,
          append: document.getElementById('drawer-group-append').clientHeight
        }
        window.addEventListener('DOMContentLoaded', function () {
          setDrawerTracker(obj)
        })
        window.addEventListener('resize', _.debounce(function () {
          const obj = {
            group: document.getElementById('drawer-group-container').clientHeight,
            top: document.getElementById('drawer-group-top').clientHeight,
            bottom: document.getElementById('drawer-group-bottom').clientHeight,
            append: document.getElementById('drawer-group-append').clientHeight
          }
          setDrawerTracker(obj)
        }, 500))
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/_mixins';
.drawer-group-container {
  overflow: hidden;
}
#drawer-group {
  height: 100vh;
  overflow: hidden;
}
#drawer-group-bottom {
  overflow-y: scroll;
}
</style>

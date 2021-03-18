<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <SettingsRoutes />
      </v-col>
      <v-col cols="9">
        <h2 class="title">
          Basic Information
        </h2>
        <AccountForm
          :account="user"
          @error="snackbar = { ...$event.snackbar }"
          @saved="snackbar = { ...$event.snackbar }, reInit($event.data)"
        />
        <h2 class="title">
          Credentials
        </h2>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="5000"
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
          @click="snackbar.show = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import SettingsRoutes from '@/components/SettingsRoutes'
import AccountForm from '@/components/AccountForm'
import { mapState } from 'vuex'
import { snackbar } from '@/constants'

export default {
  name: 'AccountSettings',
  components: {
    SettingsRoutes,
    AccountForm
  },
  middleware: ['auth'],
  data () {
    return {
      organization: [],
      snackbar
    }
  },
  head () {
    return {
      title: 'Account'
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    reInit (data) {
      const COOKIE_NAME = process.env.NUXT_ENV_COOKIE_NAME
      const CURRENT = this.$cookies.get(COOKIE_NAME)
      const payload = { ...CURRENT, ...{ user: data } }
      this.$cookies.set(COOKIE_NAME, payload)
      this.$store.commit('updateCookie', payload)
    }
  },
  mounted () {
    const name = process.env.NUXT_ENV_COOKIE_NAME
    console.log('app', this.$cookies.get(name))
  }
}
</script>

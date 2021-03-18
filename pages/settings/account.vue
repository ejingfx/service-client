<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <SettingsRoutes />
      </v-col>
      <v-col cols="9">
        <h2 class="title">
          Account Information
        </h2>
        <AccountForm :account="user" />

        <h2 class="title">
          Credentials
        </h2>
        <AccessForm />
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
import AccessForm from '@/components/AccessForm'
import { mapState } from 'vuex'
import { snackbar } from '@/constants'

export default {
  name: 'AccountSettings',
  components: {
    SettingsRoutes,
    AccountForm,
    AccessForm
  },
  middleware: ['auth'],
  data () {
    return {
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
  }
}
</script>

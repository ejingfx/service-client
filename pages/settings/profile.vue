<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <SettingsRoutes />
      </v-col>
      <v-col cols="9">
        <h2 class="title">
          Profile Information
        </h2>
        <ProfileForm
          :profile="profile"
          @error="snackbar = { ...$event.snackbar }"
          @saved="snackbar = { ...$event.snackbar }, reInit($event.data)"
        />
        <h2 class="title">
          Contact Information
        </h2>
        <ContactForm
          :contact="profile.contact"
          @error="snackbar = { ...$event.snackbar }"
          @saved="snackbar = { ...$event.snackbar }, reInit($event.data)"
        />
        <h2 class="title">
          Social Media
        </h2>
        <SnsForm
          :sns="profile.sns"
          @error="snackbar = { ...$event.snackbar }"
          @saved="snackbar = { ...$event.snackbar }, reInit($event.data)"
        />
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar.show"
      :timeout="3000"
      :color="snackbar.color"
      fixed
      bottom
      text
    >
      {{ snackbar.message | format_snackbar }}
      <template #action="{ attrs }">
        <v-btn
          icon
          :color="snackbar.color"
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
import { mapState } from 'vuex'
import ProfileForm from '@/components/ProfileForm'
import ContactForm from '@/components/ContactForm'
import SnsForm from '@/components/SnsForm'
import SettingsRoutes from '@/components/SettingsRoutes'

export default {
  name: 'ProfileSettings',
  components: {
    SettingsRoutes,
    ProfileForm,
    ContactForm,
    SnsForm
  },
  middleware: ['auth'],
  async asyncData ({ $api, store }) {
    const { data } = await $api.getProfile(store.getters.getUser.username)
    const profile = data
    return { profile }
  },
  data () {
    return {
      snackbar: {
        color: 'success',
        message: '',
        show: false
      }
    }
  },
  head () {
    return {
      title: 'Profile'
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    reInit (data) {
      this.profile = { ...data }
    }
  }
}
</script>

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
          @saved="reInit($event.data)"
        />
        <h2 class="title">
          Contact Information
        </h2>
        <ContactForm
          :contact="profile.contact"
          @saved="reInit($event.data)"
        />
        <h2 class="title">
          Social Media
        </h2>
        <SnsForm
          :sns="profile.sns"
          @saved="reInit($event.data)"
        />
      </v-col>
    </v-row>``
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

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
        <v-card class="mb-4">
          <v-form
            ref="form"
            @submit.prevent="validate"
          >
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-row>
                    <v-col cols="6">
                      Name
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="profile.first_name"
                        placeholder="First Name"
                        filled
                        :rules="rules.name"
                      />
                      <v-text-field
                        v-model="profile.middle_name"
                        filled
                        placeholder="Middle Name"
                        :rules="rules.name"
                      />
                      <v-text-field
                        v-model="profile.last_name"
                        filled
                        placeholder="Last Name"
                        :rules="rules.name"
                      />
                      <v-text-field
                        v-model="profile.name_suffix"
                        filled
                        placeholder="Suffix"
                        :rules="rules.suffix"
                      />
                      <v-radio-group
                        v-model="profile.gender"
                        row
                      >
                        <v-radio
                          label="Male"
                          value="male"
                        />
                        <v-radio
                          label="Female"
                          value="female"
                        />
                      </v-radio-group>
                      <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template #activator="{ on }">
                          <v-text-field
                            :value="profile.birth_date | format_datetime"
                            placeholder="Birth Date"
                            filled
                            readonly
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="profile.birth_date"
                          locale="en-in"
                          no-title
                          @input="menu = false"
                        />
                      </v-menu>
                      <v-textarea
                        v-model="profile.address"
                        filled
                        placeholder="Address"
                        :rules="rules.address"
                      />
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-row>
                    <v-col cols="6">
                      Contact
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-row>
                    <v-col cols="6">
                      SNS
                    </v-col>
                    <v-col cols="6">
                      <v-btn
                        type="button"
                        @click="reset"
                      >
                        RESET
                      </v-btn>
                      <v-btn
                        type="submit"
                        color="primary"
                        :disabled="loading"
                        :loading="loading"
                      >
                        SAVE
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar.visible"
      :timeout="3000"
      :color="snackbar.color"
      fixed
      bottom
      text
    >
      Saved Successfully.
      <template #action="{ attrs }">
        <v-btn
          icon
          :color="snackbar.color"
          text
          v-bind="attrs"
          @click="snackbar.visible = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import SettingsRoutes from '@/components/SettingsRoutes'

export default {
  name: 'ProfileSettings',
  components: {
    SettingsRoutes
  },
  async asyncData ({ $api, store }) {
    const { data } = await $api.getProfile(store.getters.getUser.username)
    const profile = data
    return { profile }
  },
  data () {
    return {
      snackbar: {
        visible: false,
        message: '',
        color: 'success'
      },
      loading: false,
      profileInit: {},
      profile: {
        first_name: '',
        middle_name: '',
        last_name: '',
        gender: '',
        name_suffix: '',
        birth_date: '',
        address: '',
        contact: [],
        sns: [],
        country: ''
      },
      rules: {
        name: [
          value => value.length <= 40 || 'Max of 40 characters'
        ],
        suffix: [
          value => value.length <= 20 || 'Max of 20 characters'
        ],
        address: [
          value => value.length <= 200 || 'Max of 200 characters'
        ]
      },
      gender: [
        'Male',
        'Female'
      ],
      menu: false,
      date: null
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
  mounted () {
    this.profileInit = { ...this.profile }
  },
  methods: {
    reset () {
      this.$refs.form.resetValidation()
      this.profile = { ...this.profileInit }
    },
    async validate () {
      if (this.$refs.form.validate()) {
        this.loading = true
        await this.$api
          .updateProfile(this.user.username, this.profile)
          .then(response => {
            console.log('aaa', response)
            if (response.data) {
              const snackbar = {
                visible: true,
                message: 'Saved Successfully.',
                color: 'success'
              }
              this.loading = false
              this.snackbar = { ...snackbar }
            } else if (response.errors) {
              const snackbar = {
                visible: true,
                message: 'Something went wrong, unable to save.',
                color: 'error'
              }
              this.loading = false
              this.snackbar = { ...snackbar }
            }
          })
          .catch(() => {
            this.loading = false
            this.snackbar = {
              visible: true,
              message: 'Something went wrong, unable to save.',
              color: 'error'
            }
          })
      }
    }
  }
}
</script>

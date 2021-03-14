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
            ref="profileForm"
            @submit.prevent="validate('profileForm')"
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
        <h2 class="title">
          Contacts
        </h2>
        <v-card class="mb-4">
          <v-form
            ref="contactForm"
            @submit.prevent="validate('contactForm')"
          >
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-row>
                    <v-col cols="12">
                      <v-data-table
                        :headers="contactHeader"
                        :items="contacts"
                        hide-default-footer
                      >
                        <template #[`item.actions`]="{ item }">
                          <v-btn
                            icon
                            small
                            @click="deleteItem(item)"
                          >
                            <v-icon>
                              mdi-delete
                            </v-icon>
                          </v-btn>
                        </template>
                      </v-data-table>
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
        show: false,
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
        ],
        contactName: [
          value => !!value || 'Name is required'
        ],
        contactNumber: [
          value => !!value || 'Number is required'
        ]
      },
      gender: [
        'Male',
        'Female'
      ],
      contactForm: {
        contactType: 'landline',
        name: '',
        number: null
      },
      contacts: [],
      contactHeader: [
        {
          text: 'Type',
          align: 'start',
          sortable: false,
          value: 'contactType'
        },
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Number',
          align: 'start',
          sortable: false,
          value: 'number'
        },
        {
          text: 'Actions',
          align: 'center',
          sortable: false,
          value: 'actions'
        }
      ],
      contactType: [
        {
          text: 'Landline',
          value: 'landline'
        },
        {
          text: 'Mobile',
          value: 'mobile'
        }
      ],
      snsForm: {
        name: '',
        number: null
      },
      sns: [],
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
    ...mapState(['user']),
    getContacts () { return this.contacts }
  },
  mounted () {
    this.profileInit = { ...this.profile }
    this.contacts = this.profile.contact
    this.sns = this.profile.sns
  },
  methods: {
    deleteItem (item) {
      this.contacts.splice(this.contacts.indexOf(item), 1)
      this.validate('contactForm', true)
    },
    reset (form) {
      this.$refs[form].resetValidation()
      this.profile = { ...this.profileInit }

      if (form === 'contactForm') {
        this.contactForm = {
          name: '',
          contactType: 'landline',
          number: null
        }
      }
    },
    async validate (form, deleteContact = false) {
      if (this.$refs[form].validate()) {
        let payload = {}
        this.loading = true

        if (form === 'profileForm') {
          payload = { ...this.profile }
        } else if (form === 'contactForm' && deleteContact) {
          payload = { contact: this.contacts }
        } else {
          this.contacts.push({ ...this[form] })
          payload = { contact: this.contacts }
        }
        await this.$api
          .updateProfile(this.user.username, payload)
          .then(response => {
            if (response.data) {
              const snackbar = {
                show: true,
                message: 'Saved Successfully',
                color: 'success'
              }
              this.loading = false
              this.snackbar = { ...snackbar }
              this.profile = { ...response.data }
              this.profileInit = { ...this.profile }
              this.reset(form)
            } else if (response.errors) {
              const snackbar = {
                show: true,
                message: response.errors,
                color: 'error'
              }
              this.loading = false
              this.snackbar = { ...snackbar }
            }
          })
          .catch(() => {
            this.loading = false
            this.snackbar = {
              show: true,
              message: 'Something went wrong, unable to save',
              color: 'error'
            }
          })
      }
    }
  }
}
</script>

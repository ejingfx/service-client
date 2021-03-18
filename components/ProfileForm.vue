<template>
  <v-card class="mb-4">
    <v-form
      ref="form"
      @submit.prevent="submit"
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
                  v-model="form.first_name"
                  placeholder="First Name"
                  filled
                  :rules="rules.name"
                />
                <v-text-field
                  v-model="form.middle_name"
                  filled
                  placeholder="Middle Name"
                  :rules="rules.name"
                />
                <v-text-field
                  v-model="form.last_name"
                  filled
                  placeholder="Last Name"
                  :rules="rules.name"
                />
                <v-text-field
                  v-model="form.name_suffix"
                  filled
                  placeholder="Suffix"
                  :rules="rules.suffix"
                />
                <v-radio-group
                  v-model="form.gender"
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
                      :value="form.birth_date | date"
                      placeholder="Birth Date"
                      filled
                      readonly
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="form.birth_date"
                    locale="en-in"
                    no-title
                    @input="menu = false"
                  />
                </v-menu>
                <v-textarea
                  v-model="form.address"
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
</template>

<script>
import { mapState } from 'vuex'
import { snackbar } from '@/constants'

export default {
  name: 'ProfileForm',
  props: {
    profile: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      date: null,
      form: {
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
      init: {
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
      loading: false,
      menu: false,
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
      snackbar
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    profile (data) {
      this.form = { ...data }
      this.init = { ...data }
    }
  },
  mounted () {
    this.form = { ...this.profile }
    this.init = { ...this.profile }
  },
  methods: {
    reset () {
      this.$refs.form.resetValidation()
      this.form = { ...this.profile }
    },
    async submit () {
      if (this.$refs.form.validate()) {
        this.loading = true

        await this.$api
          .updateProfile(this.user.username, this.form)
          .then(response => {
            if (response.data) {
              this.loading = false
              this.$emit('saved', {
                data: response.data,
                snackbar: this.snackbar.saved
              })
            } else if (response.errors) {
              this.loading = false
              this.$emit('error', {
                snackbar: {
                  ...this.snackbar.error,
                  ...{ message: response.errors }
                }
              })
            }
          })
          .catch(() => {
            this.loading = false
            this.$emit('error', {
              snackbar: this.snackbar.error
            })
          })
      }
    }
  }
}
</script>

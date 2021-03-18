<template>
  <v-card>
    <v-form
      ref="form"
      @submit.prevent="submit"
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-row class="mt-1">
              <v-col cols="6">
                Password
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.current"
                  :type="show.current ? 'text' : 'password'"
                  :append-icon="show.current ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="rules.password"
                  filled
                  placeholder="Current Password"
                  @click:append="show.current = !show.current"
                />
                <v-text-field
                  v-model="form.new"
                  :type="show.new ? 'text' : 'password'"
                  :append-icon="show.new ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="rules.newPassword"
                  filled
                  placeholder="Enter New Password"
                  @click:append="show.new = !show.new"
                />
                <v-text-field
                  v-model="confirm"
                  :type="show.confirm ? 'text' : 'password'"
                  :append-icon="show.confirm ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="rules.confirm"
                  filled
                  placeholder="Confirm New Password"
                  @click:append="show.confirm = !show.confirm"
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
import { snackbar } from '@/constants'
import { mapState } from 'vuex'

export default {
  name: 'AccessForm',
  data () {
    return {
      confirm: '',
      form: {
        current: '',
        new: ''
      },
      init: {},
      loading: false,
      rules: {
        password: [
          value => value.trim().length >= 6 || 'Minimum of 6 characters'
        ],
        newPassword: [
          value => value.trim().length >= 6 || 'Minimum of 6 characters'
        ],
        confirm: [
          value => value.trim().length >= 6 || 'Minimum of 6 characters',
          value => this.form.new === value || 'New Password doesn\'t match'
        ]
      },
      show: {
        current: false,
        confirm: false,
        new: false
      },
      snackbar
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted () {
    this.init = this.form
  },
  methods: {
    reset () {
      this.$refs.form.resetValidation()
      this.form = {
        current: '',
        new: ''
      }
      this.confirm = ''
    },
    async submit () {
      if (this.$refs.form.validate()) {
        const payload = {
          ...this.form,
          id: this.user.id
        }
        await this.$api
          .changePassword(payload)
          .then(response => {
            if (response.data) {
              this.loading = false
              this.$emit('saved', {
                snackbar: {
                  ...this.snackbar.saved,
                  ...{ message: response.data.message }
                }
              })
              this.reset()
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

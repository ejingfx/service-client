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
                User
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.username"
                  :rules="rules.username"
                  placeholder="Username"
                  filled
                />
                <v-text-field
                  v-model="form.email"
                  :rules="rules.email"
                  filled
                  placeholder="Email"
                />
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-row class="mt-1">
              <v-col cols="6">
                Workspace
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="form.workspace"
                  placeholder="Select Workspace"
                  filled
                  :items="account.organization"
                  item-text="name"
                  item-value="_id"
                />
                <v-btn
                  type="button"
                  @click.stop="reset"
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

export default {
  name: 'AccountForm',
  props: {
    account: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      form: {
        username: '',
        email: '',
        workspace: ''
      },
      init: {},
      loading: false,
      rules: {
        username: [
          value => !!value || 'Username is required',
          value => value.trim().length > 3 || 'Minimum of 3 characters'
        ],
        email: [
          value => !!value || 'Email is required',
          value => /.+@.+\..+/.test(value) || 'Email must be valid'
        ]
      },
      snackbar
    }
  },
  watch: {
    account (data) {
      this.init = {
        username: data.username,
        email: data.email,
        workspace: data.workspace
      }
    }
  },
  mounted () {
    this.form = {
      username: this.account.username,
      email: this.account.email,
      workspace: this.account.workspace
    }
    this.init = { ...this.form }
  },
  methods: {
    reset () {
      this.form = { ...this.init }
    },
    async submit () {
      if (this.$refs.form.validate()) {
        this.loading = true

        await this.$api
          .updateAccount(this.account.id, this.form)
          .then(response => {
            if (response.data) {
              this.loading = false
              this.$emit('saved', {
                data: response.data,
                snackbar: this.snackbar.saved
              })
              console.log('response.data', response.data)
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

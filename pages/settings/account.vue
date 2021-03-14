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
        <v-card class="mb-4">
          <v-form
            ref="basicForm"
            @submit.prevent="validate('basicForm')"
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
                        v-model="basicForm.username"
                        :rules="rules.username"
                        placeholder="Username"
                        filled
                      />
                      <v-text-field
                        v-model="basicForm.email"
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
                        v-model="basicForm.workspace"
                        placeholder="Select Workspace"
                        filled
                        :items="user.organization"
                        item-text="name"
                        item-value="_id"
                      />
                      <v-btn
                        type="button"
                        @click="reset('basicForm')"
                      >
                        RESET
                      </v-btn>
                      <v-btn
                        type="submit"
                        color="primary"
                        :disabled="buttons.basicForm"
                        :loading="buttons.basicForm"
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
          Credentials
        </h2>
        <v-card>
          <v-form
            ref="credentialForm"
            @submit.prevent="validate('credentialForm')"
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
                        v-model="password.current"
                        :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="rules.password"
                        filled
                        placeholder="Current Password"
                        @click:append="showPassword = !showPassword"
                      />
                      <v-text-field
                        v-model="password.new"
                        :type="showNewPassword ? 'text' : 'password'"
                        :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="rules.newPassword"
                        filled
                        placeholder="Enter New Password"
                        @click:append="showNewPassword = !showNewPassword"
                      />
                      <v-text-field
                        v-model="password.confirm"
                        :type="showConfirmPassword ? 'text' : 'password'"
                        :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="rules.confirm"
                        filled
                        placeholder="Confirm New Password"
                        @click:append="showConfirmPassword = !showConfirmPassword"
                      />
                      <v-btn
                        type="button"
                        @click="reset('credentialForm')"
                      >
                        RESET
                      </v-btn>
                      <v-btn
                        type="submit"
                        color="primary"
                        :disabled="buttons.credentialForm"
                        :loading="buttons.credentialForm"
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
      v-model="snackbar.show"
      :timeout="5000"
      :color="snackbar.color"
      :messages.sync="snackbar.message"
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
          @click="snackbar.visible = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import SettingsRoutes from '@/components/SettingsRoutes'
import { mapState } from 'vuex'

export default {
  name: 'AccountSettings',
  components: {
    SettingsRoutes
  },
  data () {
    return {
      loading: false,
      buttons: {
        basicForm: false,
        credentialForm: false
      },
      showPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      basicInit: {},
      basicForm: {
        username: '',
        email: '',
        workspace: ''
      },
      password: {
        current: '',
        new: '',
        confirm: ''
      },
      snackbar: {
        show: false,
        message: '',
        color: 'success'
      },
      organization: [],
      rules: {
        username: [
          value => !!value || 'Username is required',
          value => value.trim().length > 3 || 'Minimum of 3 characters'
        ],
        email: [
          value => !!value || 'Email is required',
          value => /.+@.+\..+/.test(value) || 'E-mail must be valid'
        ],
        password: [
          value => value.trim().length >= 6 || 'Minimum of 6 characters'
        ],
        newPassword: [
          value => value.trim().length >= 6 || 'Minimum of 6 characters'
        ],
        confirm: [
          value => value.trim().length >= 6 || 'Minimum of 6 characters',
          value => this.password.confirm === value || 'Password doesn\'t match.'
        ]
      }
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
  mounted () {
    this.basicForm = {
      username: this.user.username,
      email: this.user.email,
      workspace: this.user.workspace
    }
    this.basicInit = { ...this.basicForm }
  },
  methods: {
    reset (form) {
      this.$refs[form].resetValidation()
      if (form === 'basicForm') {
        this.basicForm = { ...this.basicInit }
      } else if (form === 'credentialForm') {
        this.password = {
          current: '',
          new: '',
          confirm: ''
        }
      }
    },
    async validate (form) {
      if (this.$refs[form].validate()) {
        this.buttons[form] = true
        await this.$api
          .updateAccount(this.user.id, this.basicForm)
          .then(response => {
            if (response.data) {
              this.buttons[form] = false
              const snackbar = {
                show: true,
                message: 'Saved Successfully.',
                color: 'success'
              }
              this.snackbar = { ...snackbar }
            } else if (response.errors) {
              this.buttons[form] = false
              const snackbar = {
                show: true,
                message: response.errors,
                color: 'error'
              }
              this.snackbar = { ...snackbar }
            }
          })
      }
    }
  }
}
</script>

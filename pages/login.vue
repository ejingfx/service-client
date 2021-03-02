<template>
  <v-row
    align-self="center"
    justify="center"
  >
    <v-col
      cols="12"
      align-self="center"
    >
      <div class="form">
        <v-card class="px-6 pt-4 pb-6">
          <v-form
            ref="form"
            class="pb-8"
            @submit.prevent="validate"
          >
            <v-row
              align-self="center"
              justify="center"
            >
              <v-col cols="8">
                <nuxt-link to="/">
                  <v-img :src="logo" />
                </nuxt-link>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" class="px-4 py-2">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  :rules="rules.email"
                  hide-details="auto"
                  outlined
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" class="px-4 py-2">
                <v-text-field
                  v-model="form.password"
                  label="Password"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="rules.password"
                  hide-details="auto"
                  outlined
                  @click:append="showPassword = !showPassword"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" class="pa-4">
                <v-btn
                  block
                  color="primary"
                  x-large
                  :disabled="loading"
                  :loading="loading"
                  type="submit"
                >
                  LOGIN
                </v-btn>
              </v-col>
            </v-row>
          </v-form>

          <div class="form-info">
            <v-row>
              <v-col cols="12">
                Forgot your password?
                <nuxt-link to="/forgot-password">
                  Password Reset
                </nuxt-link>
                <br>
                Don't have an account?
                <nuxt-link to="/register">
                  Sign Up
                </nuxt-link>
              </v-col>
            </v-row>
            <v-row
              v-if="hasErrors"
              cols="12"
              color="error"
              class="text-center px-4 pt-4 pb-0 mt-0"
            >
              <v-col cols="12" class="pa-0 body-2 red--text">
                {{ errors.message }}
              </v-col>
            </v-row>
          </div>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'Login',
  middleware: ['guest'],
  data () {
    return {
      logo: require('static/images/logo-dark.png'),
      showPassword: false,
      loading: false,
      hasErrors: false,
      errors: {
        message: ''
      },
      form: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          value => !!value || 'Email is required',
          value => /.+@.+\..+/.test(value) || 'E-mail must be valid'
        ],
        password: [
          value => !!value || 'Password is required'
        ]
      }
    }
  },
  methods: {
    reset () {
      setTimeout(() => {
        this.hasErrors = false
        this.errors.message = ''
      }, 3000)
    },
    async validate () {
      if (this.$refs.form.validate()) {
        this.loading = true
        await this.$api
          .login(this.form)
          .then((response) => {
            if (response.data) {
              this.loading = false
              this.$store.commit('login', response.data)
              this.$router.push({ name: 'dashboard' })
            } else if (response.errors) {
              this.hasErrors = true
              this.loading = false
              this.errors = { ...response.errors }
              this.reset()
            }
          })
          .catch(() => {
            this.hasErrors = true
            this.loading = false
            this.errors.message = 'Something went wrong. Please try again'
            this.reset()
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  min-width: 360px;
  max-width: 360px;
  margin: 0 auto;
}
.form-info {
  min-height: 104px;
  font-size: 14px;
  text-align: center;
  a {
    text-decoration: none;
  }
}
</style>

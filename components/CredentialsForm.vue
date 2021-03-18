<template>
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
                  v-model="credentialForm.current"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="rules.password"
                  filled
                  placeholder="Current Password"
                  @click:append="showPassword = !showPassword"
                />
                <v-text-field
                  v-model="credentialForm.new"
                  :type="showNewPassword ? 'text' : 'password'"
                  :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="rules.newPassword"
                  filled
                  placeholder="Enter New Password"
                  @click:append="showNewPassword = !showNewPassword"
                />
                <v-text-field
                  v-model="confirmPassword"
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
</template>

<script>
export default {
  name: 'CredentialsForm',
  data () {
    return {}
  }
}
</script>

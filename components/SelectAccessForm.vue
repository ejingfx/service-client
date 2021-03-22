<template>
  <v-row class="py-4">
    <v-col cols="6">
      <p class="px-4">
        Select Access Control
      </p>
    </v-col>
    <v-col cols="6">
      <v-form
        ref="form"
        class="mb-4"
        @submit.prevent="submit"
      >
        <v-radio-group
          v-model="form.custom_rbac"
          class="mt-0"
        >
          <v-radio
            label="Default Role-Based Access Control"
            :value="false"
          />
          <v-radio
            label="Use Custom Access Control"
            :value="true"
          />
        </v-radio-group>
        <v-btn
          @click.stop="reset"
        >
          RESET
        </v-btn>
        <v-btn
          :loading="loading"
          :disabled="loading"
          type="submit"
          color="primary"
          @click.stop="submit"
        >
          SAVE
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { snackbar } from '@/constants'

export default {
  name: 'SelectAccessForm',
  props: {
    custom: {
      type: Boolean
    }
  },
  data () {
    return {
      form: {
        custom_rbac: false
      },
      init: {
        custom_rbac: false
      },
      loading: false,
      snackbar
    }
  },
  watch: {
    custom () {
      this.init.custom_rbac = this.custom
    }
  },
  mounted () {
    this.form.custom_rbac = this.custom
    this.init.custom_rbac = this.custom
  },
  methods: {
    reset () {
      this.form.custom_rbac = this.init.custom_rbac
    },
    async submit () {
      if (this.$refs.form.validate()) {
        await this.$api
          .setRBAC(this.form)
          .then(response => {
            if (response.data) {
              this.loading = false
              this.$store.dispatch('SET_SNACKBAR', snackbar.saved)
            }
          })
      }
    }
  }
}
</script>

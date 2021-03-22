<template>
  <v-card flat>
    <v-form
      ref="form"
      @submit.prevent="submit"
    >
      <v-text-field
        v-model="form.role"
        :rules="rules.role"
        filled
        placeholder="Role name"
      />
      <v-textarea
        v-model="form.description"
        :rules="rules.description"
        filled
        placeholder="Description"
      />
      <v-select
        v-model="form.scope"
        :items="scope"
        item-text="text"
        item-value="value"
        filled
        chips
        label="Scope"
        placeholder="Scope"
        multiple
      />
      <v-row class="d-flex text-left">
        <v-col cols="12">
          <v-btn
            @click.stop="reset"
          >
            RESET
          </v-btn>
          <v-btn
            type="submit"
            color="primary"
            @click.stop="submit"
          >
            {{ modify.action !== 'update' ? 'ADD' : 'SAVE' }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { snackbar } from '@/constants'

export default {
  name: 'RBACForm',
  middleware: ['auth'],
  props: {
    modify: {
      type: Object,
      default: () => {
        return {}
      }
    },
    rbac: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      form: {
        role: '',
        description: '',
        scope: []
      },
      loading: false,
      init: {
        role: '',
        description: '',
        scope: []
      },
      index: null,
      rules: {
        role: [
          value => !!value || 'Role name is required',
          value => value.length <= 40 || 'Maximum of 40 characters'
        ],
        description: [
          value => !!value || 'Description name is required',
          value => value.length <= 200 || 'Maximum of 200 characters'
        ]
      },
      scope: [
        { text: 'Add', value: 'add' },
        { text: 'Update', value: 'update' },
        { text: 'View', value: 'view' },
        { text: 'Delete', value: 'delete' }
      ]
    }
  },
  head () {
    return {
      title: 'RBAC'
    }
  },
  watchQuery (newQuery, oldQuery) {
    console.log('qqq', newQuery, oldQuery)
  },
  watch: {
    show (value) {
      console.log('show', value)
    },
    modify (value) {
      console.log('modify', value)
      if (value.action === 'update') {
        this.form = { ...value.data }
        this.init = { ...this.form }
      } else if (value.action === 'close') {
        this.form = {
          role: '',
          description: '',
          scope: []
        }
        this.init = { ...this.form }
      }
    },
    rbac (value) {
      this.rbacList = value
    }
  },
  mounted () {
    this.rbacList = this.rbac
    if (this.modify.action === 'update') {
      this.form = { ...this.modify.data }
      this.init = { ...this.form }
    } else if (this.modify.action === 'remove') {
      this.form = {
        role: '',
        description: '',
        scope: []
      }
      this.init = { ...this.form }
    } else if (this.modify.action === 'close') {
      this.form = {
        role: '',
        description: '',
        scope: []
      }
      this.init = { ...this.form }
    } else {
      this.init = { ...this.form }
    }
  },
  methods: {
    reset () {
      this.$refs.form.resetValidation()
      this.form = { ...this.init }
    },
    async submit () {
      if (this.$refs.form.validate()) {
        this.loading = true
        const payload = {
          rbac: []
        }

        if (this.modify === 'update') {
          this.rbac.concat([this.form])
        }

        await this.$api
          .setRBAC(payload)
          .then(response => {
            if (response.data) {
              this.loading = false
              this.$store.dispatch('SET_SNACKBAR', snackbar.saved)
              this.$emit('saved', { data: response.data })
            } else if (response.errors) {
              this.loading = false
              this.$store.dispatch('SET_SNACKBAR', {
                ...snackbar.error,
                ...{ message: response.errors }
              })
            }
          })
          .catch(() => {
            this.loading = false
            this.$store.dispatch('SET_SNACKBAR', snackbar.error)
          })
      }
    }
  }
}
</script>

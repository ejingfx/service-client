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
      payload: {},
      remove: true,
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
  watch: {
    modify (value) {
      console.log('watch modify', value)
      if (value.action === 'update') {
        this.form = { ...value.data }
        this.init = { ...this.form }
      } else if (value.action === 'open') {
        this.init = { ...this.form }
      } else if (value.action === 'remove') {
        this.index = value.index
        this.remove = true
        this.payload = { rbac: this.rbac }
        this.payload.rbac.splice(this.index, 1)
        console.log('watch modify', this.payload.rbac.length)
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
      this.index = this.modify.index
      this.form = { ...this.modify.data }
      this.init = { ...this.form }
    } else if (this.modify.action === 'remove') {
      console.log('mounted remove', this.modify)
      this.index = this.modify.index
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
      this.index = null
      this.remove = null
      this.show = false
    },
    async submit () {
      if (this.$refs.form.validate() || this.remove) {
        this.loading = true
        let payload = { rbac: this.rbac }
        console.log('init payload', payload)

        if (this.index === null) {
          payload.rbac.push(this.form)
        } else if (this.remove) {
          payload = {
            ...payload,
            ...{ rbac: this.payload.rbac }
          }
        } else {
          payload.rbac[this.modify.index] = this.form
        }

        // console.log('submit payload', payload)
        await this.$api
          .setRBAC(payload)
          .then(response => {
            if (response.data) {
              this.loading = false
              this.$store.dispatch('SET_SNACKBAR', snackbar.saved)
              this.$emit('saved', { data: response.data })
              this.reset()
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

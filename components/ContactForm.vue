<template>
  <v-card class="mb-4">
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-row>
            <v-col cols="6">
              Contact List
            </v-col>
            <v-col cols="6">
              <v-list>
                <v-list-item class="px-0">
                  <v-list-item-content class="py-0">
                    <v-row class="text-right">
                      <v-col cols="12">
                        <v-btn
                          v-if="!showForm"
                          plain
                          @click.stop="showForm = !showForm"
                        >
                          ADD NEW CONTACT
                          <v-icon small>
                            mdi-plus
                          </v-icon>
                        </v-btn>
                        <v-btn
                          v-else
                          plain
                          @click.stop="showForm = !showForm, reset"
                        >
                          CLOSE
                          <v-icon small>
                            mdi-close
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
                <v-divider :class="showForm ? 'pb-4' : 'pb-2'" />
                <template v-if="!showForm">
                  <v-list-item
                    v-for="(item, i) in contact"
                    :key="i"
                    two-line
                  >
                    <v-list-item-icon>
                      <v-icon>mdi-phone</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.name }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ item.number }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action-text>
                      <v-btn
                        plain
                        small
                        text
                        class="px-1"
                        @click="showForm = !showForm, fill(item)"
                      >
                        EDIT
                      </v-btn>
                      <v-btn
                        plain
                        small
                        text
                        color="error"
                        class="px-1"
                        @click="index = contact.indexOf(item), remove = true, submit()"
                      >
                        REMOVE
                      </v-btn>
                    </v-list-item-action-text>
                  </v-list-item>
                </template>
                <template v-else>
                  <v-list-item class="px-0">
                    <v-row>
                      <v-col cols="12">
                        <v-form
                          ref="form"
                          @submit.prevent="submit"
                        >
                          <v-text-field
                            v-model="form.name"
                            filled
                            placeholder="Name"
                            :rules="rules.name"
                          />
                          <v-text-field
                            v-model="form.number"
                            filled
                            placeholder="Number"
                            :rules="rules.number"
                            type="number"
                          />
                          <v-radio-group
                            v-model="form.contactType"
                            row
                            hide-details="auto"
                            class="pb-10"
                          >
                            <v-radio
                              label="Landline"
                              value="landline"
                            />
                            <v-radio
                              label="Mobile"
                              value="mobile"
                            />
                          </v-radio-group>
                          <v-btn
                            type="button"
                            @click="reset"
                          >
                            RESET
                          </v-btn>
                          <v-btn
                            color="primary"
                            type="submit"
                          >
                            {{ index === null ? 'ADD' : 'SAVE' }}
                          </v-btn>
                        </v-form>
                      </v-col>
                    </v-row>
                  </v-list-item>
                </template>
              </v-list>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import { snackbar } from '@/constants'

export default {
  name: 'ContactForm',
  props: {
    contact: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      form: {
        contactType: 'landline',
        name: '',
        number: null
      },
      index: null,
      payload: [],
      remove: false,
      showForm: false,
      snackbar,
      rules: {
        name: [
          value => !!value || 'Name is required',
          value => value.length <= 20 || 'Maximum of 20 characters'
        ],
        number: [
          value => !!value || 'Number is required'
        ]
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    contact () {
      this.form = {
        contactType: 'landline',
        name: '',
        number: null
      }
    }
  },
  methods: {
    fill (item) {
      this.index = this.contact.indexOf(item)
      this.form = { ...this.contact[this.index] }
    },
    reset () {
      this.$refs.form.resetValidation()
      this.form = { ...this.contact[this.index] }
    },
    async submit () {
      if (this.remove || this.$refs.form.validate()) {
        this.payload = this.contact

        if (this.index === null) {
          this.payload.push({ ...this.form })
        } else if (this.remove) {
          this.payload.splice(this.index, 1)
        } else {
          this.payload[this.index] = { ...this.form }
        }

        this.loading = true
        await this.$api
          .updateProfile(this.user.username, { contact: this.payload })
          .then(response => {
            if (response.data) {
              this.loading = false
              this.showForm = false
              this.$emit('saved', {
                data: response.data,
                snackbar: this.snackbar.saved
              })
              this.index = null
              this.payload = []
              if (this.remove) { this.remove = false }
            } else if (response.errors) {
              this.loading = false
              this.payload = []
              this.$emit('error', {
                snackbar: {
                  ...this.snackbar.error,
                  ...{ message: response.errors }
                }
              })
              if (this.remove) { this.remove = false }
            }
          })
          .catch(() => {
            this.loading = false
            this.payload = []
            this.$emit('error', {
              snackbar: this.snackbar.error
            })
            if (this.remove) { this.remove = false }
          })
      }
    }
  }
}
</script>

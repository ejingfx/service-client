<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <OrganizationRoutes />
      </v-col>

      <v-col cols="9">
        <h2 class="title">
          Access Group
        </h2>
        <v-card class="mb-4 py-4">
          <SelectAccessForm :custom="custom" />
          <v-divider class="mb-4" />
          <v-tabs
            v-model="tab"
            grow
          >
            <v-tab>
              Default
            </v-tab>
            <v-tab>
              Custom
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item class="pa-4">
              <v-list>
                <v-list-item
                  v-for="(item, i) in defaultRbac"
                  :key="i"
                  class="px-2"
                >
                  <v-list-item-content>
                    <section>
                      <h3 class="title">
                        {{ item.role | capitalize }}
                      </h3>
                      <p>
                        {{ item.description }}
                      </p>
                    </section>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-tab-item>
            <v-tab-item class="pa-4">
              <v-row>
                <v-col
                  cols="12"
                  style="min-height: 200px;"
                >
                  <div
                    v-if="!show && rbac.length <= 0"
                    class="d-flex justify-center fill-height align-center pt-4"
                  >
                    <v-btn
                      plain
                      color="primary"
                      @click="show = true, modify = { show: true, index: null, action: 'open' }"
                    >
                      <v-icon>
                        mdi-plus
                      </v-icon>
                      ADD NEW ROLE
                    </v-btn>
                  </div>
                  <v-row v-else>
                    <v-col cols="6">
                      <strong>Custom List</strong>
                      <v-list>
                        <v-list-item
                          v-for="(item, i) in rbac"
                          :key="i"
                          class="px-0"
                        >
                          <v-list-item-content>
                            <section>
                              <h3 class="title">
                                {{ item.role | capitalize }}
                              </h3>
                              <p>
                                {{ item.description }}
                              </p>
                            </section>
                          </v-list-item-content>
                          <v-list-item-action-text>
                            <v-btn
                              plain
                              small
                              text
                              class="px-1"
                              @click="show = true, fill(item)"
                            >
                              EDIT
                            </v-btn>
                            <v-btn
                              plain
                              small
                              text
                              color="error"
                              class="px-1"
                              @click="remove(item)"
                            >
                              REMOVE
                            </v-btn>
                          </v-list-item-action-text>
                        </v-list-item>
                      </v-list>
                    </v-col>
                    <v-col cols="6" class="pt-4 text-right">
                      <v-btn
                        v-if="!show"
                        plain
                        @click.stop="show = !show"
                      >
                        ADD NEW ROLE
                        <v-icon small>
                          mdi-close
                        </v-icon>
                      </v-btn>
                      <v-btn
                        v-else
                        plain
                        @click.stop="show = !show, modify = { action: 'close', data: null }"
                      >
                        CLOSE
                        <v-icon small>
                          mdi-close
                        </v-icon>
                      </v-btn>
                      <v-divider class="mb-5" />
                      <RBACForm
                        v-show="show"
                        :rbac="rbac"
                        :modify="modify"
                        @saved="show = false, custom_rbac = $event.data.custom, rbac = $event.data.rbac"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import OrganizationRoutes from '@/components/OrganizationRoutes'
import SelectAccessForm from '@/components/SelectAccessForm'
import RBACForm from '@/components/RBACForm'
import _ from 'lodash'

export default {
  name: 'Roles',
  components: {
    OrganizationRoutes,
    SelectAccessForm,
    RBACForm
  },
  middleware: ['auth'],
  async asyncData ({ $api, store }) {
    if (!_.isNull(store.state.user.workspace)) {
      const response = await $api.getRBAC(store.state.user.workspace)
      // eslint-disable-next-line camelcase
      const custom = response.data.custom_rbac
      const rbac = response.data.rbac
      return {
        custom,
        rbac
      }
    }
  },
  data () {
    return {
      defaultRbac: [
        {
          role: 'contributor',
          description: 'Grants full access to manage all resources in your organization, but does not allow you to assign roles, manage assignments.'
        },
        {
          role: 'owner',
          description: 'Grants full access to manage all resources in your organization, including the ability to assign roles.'
        },
        {
          role: 'admin',
          description: 'Lets you manage user access to all resources in your organization.'
        },
        {
          role: 'reader',
          description: 'View all your organization resources but does not allow you to make any changes.'
        }
      ],
      init: false,
      show: false,
      tab: null,
      modify: {
        action: '',
        index: null,
        data: null
      }
    }
  },
  head () {
    return {
      title: 'Roles'
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    custom (value) {
      this.custom = value
    }
  },
  methods: {
    fill (item) {
      this.show = true
      this.modify = {
        action: 'update',
        index: this.rbac.indexOf(item),
        data: { ...item }
      }
    },
    remove (item) {
      const data = []
      data.concat(this.rbac)
      data.splice(this.rbac.indexOf(item), 1)
      const obj = {
        action: 'remove',
        index: this.rbac.indexOf(item),
        data
      }
      this.modify = { ...this.modify, ...obj }
    }
  }
}
</script>

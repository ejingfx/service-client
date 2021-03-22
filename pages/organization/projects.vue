<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <OrganizationRoutes />
      </v-col>

      <v-col cols="9">
        <v-form ref="form">
          <v-list outlined>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Theme</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Theme</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrganizationRoutes from '@/components/OrganizationRoutes'

export default {
  name: 'Projects',
  components: {
    OrganizationRoutes
  },
  middleware: ['auth'],
  head () {
    return {
      title: 'Projects'
    }
  }
}
</script>

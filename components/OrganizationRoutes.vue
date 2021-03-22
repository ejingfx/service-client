<template>
  <v-card>
    <v-list flat>
      <v-list-item
        v-for="(route, i) in routes"
        :key="i"
        color="primary"
        :to="route.to"
        link
        exact
      >
        <v-list-item-icon class="mx-3">
          <v-icon>{{ route.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ route.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { ORGANIZATION_ROUTES } from '@/constants'

export default {
  name: 'OrganizationRoutes',
  data () {
    return {
      routes: ORGANIZATION_ROUTES
    }
  }
}
</script>

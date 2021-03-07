<template>
  <v-card>
    <v-list flat>
      <v-list-item
        v-for="(setting, i) in settings"
        :key="i"
        color="primary"
        :to="setting.to"
        link
        exact
      >
        <v-list-item-icon class="mx-3">
          <v-icon>{{ setting.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ setting.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import settings from '@/utility/settings-routes'

export default {
  name: 'SettingsRoutes',
  data () {
    return {
      settings
    }
  }
}
</script>

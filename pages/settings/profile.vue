<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <SettingsRoutes />
      </v-col>
      <v-col cols="9">
        <v-form ref="general-form">
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
import SettingsRoutes from '@/components/SettingsRoutes'

export default {
  name: 'ProfileSettings',
  components: {
    SettingsRoutes
  }
}
</script>

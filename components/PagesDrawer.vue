<template>
  <v-list-group>
    <template #activator>
      <v-list-item-content>
        <v-list-item-title>Pages</v-list-item-title>
      </v-list-item-content>
    </template>
    <v-list-item v-if="pages.length === 0">
      <v-list-item-content class="pl-4">
        <v-list-item-subtitle>
          No items added yet
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <template v-else>
      <v-list-item
        v-for="item in pages"
        :key="item.title"
      >
        <v-list-item-content class="pl-4">
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list-group>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PagesDrawer',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['pages'])
  }
}
</script>

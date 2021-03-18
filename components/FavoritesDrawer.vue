<template>
  <v-list-group>
    <template #activator>
      <v-list-item-content>
        <v-list-item-title>Favorites</v-list-item-title>
      </v-list-item-content>
    </template>

    <v-list-item v-if="favorites.length === 0">
      <v-list-item-content class="pl-4">
        <v-list-item-subtitle>
          No items added yet
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <template v-else>
      <div class="drawer-group">
        <v-list-item
          v-for="(item, i) in favorites"
          :key="i"
        >
          <v-list-item-content class="pl-4">
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </template>
  </v-list-group>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FavoritesDrawer',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['favorites'])
  }
}
</script>

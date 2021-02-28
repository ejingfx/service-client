<template>
  <v-list>
    <v-list-item class="text-center">
      <v-list-item-content style="display: block; width: 100%;">
        <nuxt-link to="/">
          <v-img :src="logo" />
        </nuxt-link>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'UserInfoDrawer',
  data () {
    return {
      logo: require('static/svg/logo.svg')
    }
  }
}
</script>

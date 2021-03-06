<template>
  <div>Welcome {{ user.username | capitalize }}!</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  middleware: ['auth'],
  head () {
    return {
      title: 'Dashboard'
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

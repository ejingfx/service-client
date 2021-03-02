<template>
  <div>Welcome {{ user.username | capitalize }}!</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  middleware: ['auth'],
  computed: {
    ...mapState(['user'])
  }
}
</script>

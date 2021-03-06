<template>
  <v-card
    class="pa-6"
    style="min-height: 1000px;"
  >
    Settings
  </v-card>
</template>

<script>
export default {
  name: 'Settings',
  middleware: ['auth']
}
</script>

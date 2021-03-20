<template>
  <div>Tickets</div>
</template>

<script>
export default {
  name: 'Tickets',
  middleware: ['auth'],
  head () {
    return {
      title: 'Tickets'
    }
  }
}
</script>

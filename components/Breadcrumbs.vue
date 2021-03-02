<template>
  <v-breadcrumbs
    :items="getItems"
  >
    <template #item="{ item }">
      <v-breadcrumbs-item
        :href="item.href"
        :disabled="item.disabled"
      >
        {{ item.text.toUpperCase() }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  computed: {
    getItems () {
      const items = [
        {
          text: 'HOME',
          disabled: false,
          href: '/'
        }
      ]

      this.$route.name.split('/').forEach((item, i) => {
        items.push({
          text: item,
          disabled: items.length - 1 === i,
          href: `/${item}`
        })
      })

      return items
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumbs {
  background-color: transparent;
}
</style>

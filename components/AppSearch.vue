<template>
  <v-form
    ref="app-search"
  >
    <v-text-field
      solo
      dense
      flat
      outlined
      rounded
      filled
      small
      label="Search"
      prepend-inner-icon="mdi-magnify"
      hide-details="true"
      class="search-field"
    />
  </v-form>
</template>

<script>
export default {
  name: 'AppSearch'
}
</script>

<style lang="scss">
.search-field.v-text-field.v-text-field--solo.v-input--dense > .v-input__control {
  min-height: 28px;
  box-sizing: border-box;
}
.search-field.v-text-field--rounded > .v-input__control > .v-input__slot {
  min-height: 28px !important;
  padding: 0 10px !important;
  box-sizing: border-box;

  .v-icon {
    font-size: 20px;
  }

  label {
    top: 50%;
    transform: translateY(-50%);
  }

  input {
    font-size: 14px;
    width: 80px;
  }
}
</style>

<template>
  <div class="mx-auto">
    <v-alert
      prominent
      type="success"
      class="text-h6 pa-5 font-weight-light text-center"
      elevation="16"
      max-width="500px"
    >
      {{
        `Geographic coordinate has been successfully attached to your home cell at ${$store.state.latestUpdate.location}.`
      }}
    </v-alert>
  </div>
</template>

<script>
export default {
  layout: 'AddLocation',
  data() {
    return {}
  },
}
</script>

<style lang="css" scoped></style>

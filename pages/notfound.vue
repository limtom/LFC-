<template>
  <div class="mx-auto">
    <v-alert
      prominent
      type="error"
      class="text-h6 pa-5 font-weight-light text-center"
      elevation="16"
      max-width="500px"
    >
      {{ `Home cell not found, try again with a different phone number ` }}
      <v-btn
        elevation=""
        color=""
        nuxt
        to="/inspire"
        outlined
        dark
        class="text-capitalize font-weight-light"
      >
        Try-again
      </v-btn>
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

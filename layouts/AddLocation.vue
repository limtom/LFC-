<template>
  <v-app dark>
    <v-main>
      <v-container class="fill-height">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer absolute app>
      <span class="text-center text-body-2 mx-auto">
        &copy; {{ new Date().getFullYear() }}
      </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'AddLocation',
  data() {
    return {}
  },
}
</script>

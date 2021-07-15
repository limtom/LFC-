<template>
  <v-app dark>
    <v-app-bar fixed app flat>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main>
      <v-container fluid class="fill-height pa-0">
        <nuxt />
      </v-container>
    </v-main>
    <!-- <v-footer absolute fixed app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'WSF LOCATIONS',
    }
  },
}
</script>

<style scoped></style>

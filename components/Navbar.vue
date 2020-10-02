<template>
  <v-app-bar
    fixed
    app
    clipped-left
  >
    <v-toolbar-title>Tu prefère</v-toolbar-title>
    <v-btn icon nuxt to="/">
      <v-icon>fa-home</v-icon>
    </v-btn>
    <v-spacer />
    <v-btn icon @click="toggleTheme">
      <v-icon class="mx-4">
        {{ $vuetify.theme.dark ? 'fas fa-moon' : 'fas fa-sun' }}
      </v-icon>
    </v-btn>
    <v-btn icon nuxt to="/admin">
      <v-icon class="mx-4">
        fa-user-cog
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    myDrawer: {
      get () {
        return this.drawer
      },
      set (value) {
        this.drawer = value
      }
    }
  },
  methods: {
    toggleTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  }
}
</script>

<style scoped>

</style>

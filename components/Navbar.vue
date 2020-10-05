<template>
  <v-app-bar
    fixed
    app
    clipped-left
  >
    <v-toolbar-title>Tu prefère</v-toolbar-title>
    <v-btn icon nuxt to="/main">
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
    <v-menu v-if="avatar !== null" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon class="mx-2" v-on="on">
          <v-avatar size="45">
            <v-img :src="avatar" alt="avatar" />
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="logout">
          <v-list-item-title>Déconnexion</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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
    },
    avatar () {
      return this.$store.state.avatar
    }
  },
  methods: {
    toggleTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    logout () {
      this.$store.commit('updateAvatar', null)
      this.$store.commit('updateUsername', '')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>

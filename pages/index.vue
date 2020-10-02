<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Tu prefère Marrons
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <p>Tu veut rejoindre une game ? saisie le pin pour jouer</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="username"
                label="Nom"
                solo
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="slug"
                solo
                label="Game PIN"
              />
            </v-col>
            <v-col md="2">
              <v-btn
                outlined
                large
                color="primary"
                nuxt
                :to="`game/${ slug }`"
                :disabled="slug === null || slug === ''"
              >
                Go
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card class="mt-4">
        <v-card-title>Créer une game</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <h3>Tu souhaite creer une game ?</h3>
            </v-col>
            <v-col md="2">
              <v-btn color="primary" nuxt to="/creation">
                Creer
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      slug: null
    }
  },
  computed: {
    username: {
      get () {
        return this.$store.state.user.username
      },
      set (value) {
        this.$store.commit('user/updateUsername', value)
      }
    }
  }
}
</script>

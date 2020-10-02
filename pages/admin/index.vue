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
              <p>Saise le PIN de la game que tu souhaite administrer</p>
            </v-col>
          </v-row>
          <v-row>
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
                :to="`admin/${ slug }`"
                :disabled="slug === null || slug === ''"
              >
                Go
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

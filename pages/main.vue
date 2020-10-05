<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Rejoindre une game
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <p>Tu veut rejoindre une game ? saisie le pin pour jouer</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" xs="10" md="10">
              <v-text-field
                v-model="slug"
                solo
                label="Game PIN"
              />
            </v-col>
            <v-col cols="12" xs="2" md="2" class="text-right">
              <v-btn
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
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/creation">
            Creer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      slug: null
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <v-skeleton-loader
      class="mx-auto"
      type="heading, image, button"
      :loading="loading"
    >
      <h1>Creer une partie</h1>
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-text-field
          v-model="game.name"
          :rules="nameRules"
          label="Nom de la partie"
          required
        />

        <v-text-field
          v-model.number="pin"
          counter="5"
          :rules="pinRules"
          label="PIN"
          required
        />

        <v-card color="my-4">
          <v-card-title>
            Questions
            <v-spacer />
            <v-btn color="primary" @click="addQuestion">
              Ajouter
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-expansion-panels
              popout
              inset
            >
              <v-expansion-panel
                v-for="(item,i) in game.choices"
                :key="i"
              >
                <v-expansion-panel-header>
                  Question {{ i + 1 }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-text-field v-model="item.choice1" label="Choix 1" />
                  <v-text-field v-model="item.choice2" label="Choix 2" />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="createGame"
        >
          Creer
        </v-btn>
      </v-form>
    </v-skeleton-loader>
    <v-snackbar
      v-model="snack"
      elevation="24"
      color="success"
      timeout="60000"
    >
      Partie Créer avec succès
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="play"
        >
          Jouer
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'Creation',
  data () {
    return {
      loading: true,
      snack: false,
      partyRef: null,
      parties: [],
      valid: true,
      nameRules: [
        v => !!v || 'Le nom de la partie est obligatoire'
      ],
      pin: '',
      pinRules: [
        v => !!v || 'Le PIN est obligatoire'
      ],
      game: {
        status: 'WAITING',
        answers: null,
        choices: [],
        current: 0,
        name: ''
      }
    }
  },
  created () {
    this.partyRef = this.$fireDb.ref('parties')
    this.partyRef.on('value', (snapshot) => {
      this.loading = false
      this.parties = snapshot.val()
      this.alert = true
    })
  },
  methods: {
    createGame () {
      if (this.validate()) {
        this.parties[this.pin] = this.game
        this.partyRef.set(this.parties)
        this.snack = true
      }
    },
    validate () {
      if (!this.$refs.form.validate()) {
        return false
      }
      for (const item in this.game.choices) {
        if (item.choice1 === null) {
          return false
        }
        if (item.choice2 === null) {
          return false
        }
      }
      return true
    },
    addQuestion () {
      const empty = {
        choice1: null,
        choice2: null
      }
      this.game.choices.push(empty)
    },
    play () {
      this.$router.push(`game/${this.pin}`)
    }
  }
}
</script>

<style scoped>

</style>

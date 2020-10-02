<template>
  <div>
    <h1>Creer une partie</h1>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-text-field
        v-model="name"
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
              v-for="(item,i) in dylema"
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
  </div>
</template>

<script>
export default {
  name: 'Creation',
  data () {
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Le nom de la partie est obligatoire'
      ],
      pin: '',
      pinRules: [
        v => !!v || 'Le PIN est obligatoire'
      ],
      dylema: []
    }
  },
  methods: {
    createGame () {
      if (this.validate()) {
        alert('good')
      }
    },
    validate () {
      if (!this.$refs.form.validate()) {
        return false
      }
      for (const item in this.dylema) {
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
      this.dylema.push(empty)
    }
  }
}
</script>

<style scoped>

</style>

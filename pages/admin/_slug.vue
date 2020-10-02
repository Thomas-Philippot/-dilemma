<template>
  <div>
    <div v-if="!recap">
      <h1>{{ party.name }}</h1>
      <v-row>
        <v-col>
          <v-progress-linear
            :value="(firstAnswers / strenght * 100)"
            color="blue"
            height="50"
            striped
            rounded
          >
            <template v-slot:default>
              <strong>{{ party.choices[party.current].choice1 }}</strong>
            </template>
          </v-progress-linear>
        </v-col>
        <v-col>
          <v-progress-linear
            :value="(secondAnswers / strenght * 100)"
            color="red"
            height="50"
            reverse
            striped
            rounded
          >
            <template v-slot:default>
              <strong>{{ party.choices[party.current].choice2 }}</strong>
            </template>
          </v-progress-linear>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="next" color="primary">
            Next
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <h1>Récapitulatif</h1>
      <v-row v-for="(item, id) in party.choices" :key="id">
        <v-col>
          <v-progress-linear
            :value="(currentFirstAnswers(id) / strenght * 100)"
            color="blue"
            height="50"
            striped
            rounded
          >
            <template v-slot:default>
              <strong>{{ item.choice1 }}</strong>
            </template>
          </v-progress-linear>
        </v-col>
        <v-col>
          <v-progress-linear
            :value="(currentSecondAnswers(id) / strenght * 100)"
            color="red"
            height="50"
            reverse
            striped
            rounded
          >
            <template v-slot:default>
              <strong>{{ item.choice2 }}</strong>
            </template>
          </v-progress-linear>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminS',
  data () {
    return {
      slug: this.$route.params.slug,
      party: {
        name: null,
        current: 0,
        answers: [],
        users: [],
        choices: [
          {
            choice1: null,
            choice2: null
          }
        ]
      },
      partyRef: null,
      recap: false
    }
  },
  computed: {
    currentAnswers () {
      return this.party.answers.filter(item => item.index === this.party.current)
    },
    firstAnswers () {
      return this.currentAnswers.filter(item => item.answer === 0).length
    },
    secondAnswers () {
      return this.currentAnswers.filter(item => item.answer === 1).length
    },
    strenght () {
      return this.party.users.length
    }
  },
  created () {
    this.partyRef = this.$fireDb.ref(`parties/${this.slug}`)
    this.partyRef.on('value', (snapshot) => {
      this.party = snapshot.val()
      if (!('answers' in this.party)) {
        this.party.answers = []
      }
      if (this.party.status === 'WAITING') {
        this.party.status = 'START'
        this.partyRef.set(this.party)
      }
    })
  },
  methods: {
    next () {
      if (this.party.current + 1 < this.party.choices.length) {
        this.party.current++
        this.partyRef.set(this.party)
      } else {
        this.recap = true
      }
    },
    currentFirstAnswers (index) {
      return this.party.answers.filter(item => item.index === index).filter(item => item.answer === 0).length
    },
    currentSecondAnswers (index) {
      return this.party.answers.filter(item => item.index === index).filter(item => item.answer === 1).length
    }
  }
}
</script>

<style scoped>

</style>

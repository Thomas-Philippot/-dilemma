<template>
  <div>
    <h1>{{ party.name }}</h1>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Questions</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" xs="12" md="6">
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    :elevation="hover ? 12 : 2"
                    class="d-flex align-center justify-center pa-4 mx-auto"
                    style="height: 300px"
                    color="blue"
                    @click="choose(1)"
                  >
                    <v-card-text class="my-4 text-center title">
                      {{ party.choices[party.current].choice1 }}
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>
              <v-col cols="12" xs="12" md="6">
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    :elevation="hover ? 12 : 2"
                    class="d-flex align-center justify-center pa-4 mx-auto"
                    style="height: 300px"
                    color="red"
                    @click="choose(2)"
                  >
                    <v-card-text class="my-4 text-center title">
                      {{ party.choices[party.current].choice2 }}
                    </v-card-text>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Slug',
  data () {
    return {
      slug: this.$route.params.slug,
      party: {
        name: null,
        choices: [
          {
            choice1: '',
            choice2: ''
          }
        ],
        answers: [
          {
            name: '',
            answer: null
          }
        ],
        current: 0
      },
      partyRef: null,
      joined: false
    }
  },
  computed: {
    username () {
      return this.$store.state.username
    }
  },
  created () {
    this.partyRef = this.$fireDb.ref(`parties/${this.slug}`)
    this.partyRef.on('value', (snapshot) => {
      this.party = snapshot.val()
      if (!('answers' in this.party)) {
        this.party.answers = []
      }
    })
  },
  methods: {
    choose (i) {
      i--
      const answer = {
        name: this.username,
        answer: i,
        index: this.party.current
      }
      if (this.canAnswer(answer)) {
        this.party.answers.push(answer)
      }
      this.partyRef.set(this.party)
    },
    canAnswer (answer) {
      for (let i = 0; i < this.party.answers.length; i++) {
        if (this.party.answers[i].name === answer.name && this.party.answers[i].index === this.party.current) {
          return false
        }
      }
      return true
    }
  }
}
</script>

<style scoped>

</style>

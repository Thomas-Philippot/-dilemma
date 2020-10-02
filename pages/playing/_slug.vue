<template>
  <div>
    <h1>{{ party.name }}</h1>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Questions</v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="i in 2" :key="i">
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    :elevation="hover ? 12 : 2"
                    class="mx-auto"
                    @click="choose(i)"
                  >
                    <v-card-text class="my-4 text-center title">
                      {{ party.choices[party.current][`choice${i}`] }}
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
        name: 'thomas',
        answer: i,
        index: this.party.current
      }
      if (this.canAnswer(this.username)) {
        // eslint-disable-next-line no-console
        console.log('add answer')
        this.party.answers.push(answer)
      }
      this.partyRef.set(this.party)
    },
    canAnswer (name) {
      for (let i = 0; i < this.party.answers.length; i++) {
        if (this.party.answers[i].name === name) {
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

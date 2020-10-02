<template>
  <div>
    <h1>{{ party.name }}</h1>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Joueurs en attentes</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(item, id) in party.users" :key="id">
                <v-list-item-content>
                  {{ item.name }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn v-if="!joined" color="primary" @click="join">
              Rejoindre
            </v-btn>
          </v-card-actions>
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
        name: null
      },
      partyRef: null,
      joined: false
    }
  },
  computed: {
    username () {
      return this.$store.state.user.username
    }
  },
  created () {
    this.partyRef = this.$fireDb.ref(`parties/${this.slug}`)
    this.partyRef.on('value', (snapshot) => {
      this.party = snapshot.val()
      if (this.party.status === 'START') {
        this.$router.push(`/playing/${this.slug}`)
      }
      if (!('users' in this.party)) {
        this.party.users = []
      }
    })
  },
  methods: {
    join () {
      if (this.canJoin({ name: this.username })) {
        this.party.users.push({ name: this.username })
        this.joined = true
      }
      this.partyRef.set(this.party)
    },
    canJoin (user) {
      for (let i = 0; i < this.party.users.length; i++) {
        if (this.party.users[i].name === user.name) {
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

<template>
  <v-row justify="center" align="center">
    <v-col cols="12" xs="12" md="12">
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title>Tu prefère Marrons</v-card-title>
            <v-card-text>
              <p>Avant de commencer saisie ton nom puis choisie un avatar</p>
              <v-row>
                <v-col v-if="avatar !== null" cols="12" sm="3" md="3">
                  <v-avatar size="56">
                    <v-img :src="avatar" alt="avatar" />
                  </v-avatar>
                </v-col>
                <v-col cols="12" sm="8" md="8">
                  <v-text-field
                    v-model="username"
                    :readonly="avatar !== null"
                    label="Nom"
                    solo
                  />
                </v-col>
              </v-row>
              <v-row v-if="avatar === null && username !== ''" justify="space-between">
                <v-col cols="12" xs="8" md="8">
                  <v-file-input
                    v-model="file"
                    chips
                    solo
                    label="Avatar"
                    truncate-length="30"
                    prepend-icon="fa-user-circle"
                    accept="image/jpeg"
                  >
                    <template v-slot:selection="{ index, text }">
                      <v-chip
                        color="primary"
                        dark
                        label
                        small
                      >
                        {{ text }}
                      </v-chip>
                    </template>
                  </v-file-input>
                </v-col>
                <v-col cols="12" xs="3" md="3" class="text-right">
                  <v-btn :disabled="(file === null)" large outlined color="secondary" @click="upload">
                    Upload
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-progress-linear
                    v-if="uploading"
                    color="primary"
                    :value="progression"
                    striped
                    rounded
                    height="12px"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="secondary" outlined @click="reset">
                Reset
              </v-btn>
              <v-btn color="primary" nuxt to="/main" :disabled="username === ''">
                Commencer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-snackbar :value="snack" color="error" timeout="60000">
      {{ error }}
    </v-snackbar>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      snack: false,
      error: '',
      file: null,
      uploading: false,
      progression: null
    }
  },
  computed: {
    username: {
      get () {
        return this.$store.state.username
      },
      set (value) {
        this.$store.commit('updateUsername', value)
      }
    },
    avatar: {
      get () {
        return this.$store.state.avatar
      },
      set (value) {
        this.$store.commit('updateAvatar', value)
      }
    }
  },
  methods: {
    upload () {
      this.uploading = true
      const path = `${this.username}.jpg`
      const task = this.$fireStorage.ref().child(path).put(this.file)
      task.then(() => {
        this.$fireStorage.ref().child(path).getDownloadURL().then((response) => {
          this.avatar = response
        }).catch((e) => {
          this.snack = true
          this.error = e.message
        })
        this.uploading = false
      })
      task.on('state_changed', (response) => {
        this.progression = (response.bytesTransferred / response.totalBytes) * 100
      })
    },
    reset () {
      this.username = ''
      this.avatar = null
    }
  }
}
</script>

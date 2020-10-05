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
                <v-col v-if="avatar !== null" sx="1" md="1">
                  <v-avatar size="56">
                    <v-img :src="avatar" alt="avatar" />
                  </v-avatar>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="username"
                    :readonly="avatar !== null"
                    label="Nom"
                    solo
                  />
                </v-col>
              </v-row>
              <v-row v-if="avatar === null && username !== ''">
                <v-col>
                  <v-file-input
                    v-model="file"
                    chips
                    solo
                    label="Avatar"
                    truncate-length="15"
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
                <v-spacer />
                <v-col cols="12" xs="2" md="2">
                  <v-btn :disabled="(file === null)" @click="upload">
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
              <v-btn color="primary" nuxt to="/main">
                Commencer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
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
        })
        this.uploading = false
      })
      task.on('state_changed', (response) => {
        this.progression = (response.bytesTransferred / response.totalBytes) * 100
      })
    }
  }
}
</script>

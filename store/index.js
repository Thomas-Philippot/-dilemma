export const state = () => ({
  username: '',
  avatar: null
})

export const mutations = {
  updateUsername (state, value) {
    state.username = value
  },
  updateAvatar (state, value) {
    state.avatar = value
  }
}

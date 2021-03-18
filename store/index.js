import _ from 'lodash'
const Cookie = process.client ? require('js-cookie') : undefined
const cookieparser = process.server ? require('cookieparser') : undefined

const state = () => ({
  authenticated: false,
  favorites: [],
  forms: [],
  organizations: [],
  pages: [],
  snackbar: {
    color: 'success',
    message: '',
    show: false
  },
  token: '',
  user: {}
})

const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let data = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        const obj = JSON.parse(parsed[process.env.NUXT_ENV_COOKIE_NAME])
        data = { ...obj }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    }
    commit('setInit', data)
  },
  COOKIE_UPDATE ({ commit }, data) {
    commit('cookieUpdate', data)
  },
  DISMISS_SNACKBAR ({ commit }) {
    commit('dismissSnackbar')
  },
  SET_SNACKBAR ({ commit }, data) {
    commit('setSnackbar', data)
    setTimeout(() => {
      commit('dismissSnackbar')
    }, 5000)
  },
  SET_WORKSPACE ({ commit }, data) {
    commit('setWorkspace', data)
  }
}

const mutations = {
  dismissSnackbar (state) {
    state.snackbar.message = ''
    state.snackbar.show = false
  },
  login (state, payload) {
    const data = { authenticated: true, ...payload }
    Object.assign(state, { ...data })
    Cookie.set(process.env.NUXT_ENV_COOKIE_NAME, data)
  },
  logout (state) {
    const data = { authenticated: false, token: '' }
    Object.assign(state, { ...data })
    Cookie.remove(process.env.NUXT_ENV_COOKIE_NAME)
  },
  setInit (state, payload) {
    Object.assign(state, { ...payload })
  },
  setSnackbar (state, payload) {
    Object.assign(state.snackbar, payload)
  },
  setWorkspace (state, payload) {
    state.user.workspace = payload
  },
  cookieUpdate (state, payload) {
    const userKeys = ['email', 'id', 'organization', 'username', 'workspace']
    const innerKey = userKeys.includes(payload.data.key)
    if (innerKey) {
      for (const [value] of Object.entries(state)) {
        if (_.isObject(value) && Object.keys(value).includes(payload.data.key)) {
          value[payload.data.key] = payload.data.value
        }
      }
    } else {
      state[payload.data.key] = payload.data.value
    }
    const COOKIE_NAME = process.env.NUXT_ENV_COOKIE_NAME
    const COOKIE = payload.$cookies.get(COOKIE_NAME)
    Object.assign(COOKIE, state)
    payload.$cookies.set(COOKIE_NAME, COOKIE)
  },
  setOrganization (state, payload) {
    Object.assign(state, { ...payload })
  }
}

const getters = {
  getAuthenticated: state => state.authenticated,
  getUser: state => state.user,
  getToken: state => state.token
}

export default {
  state,
  actions,
  mutations,
  getters
}

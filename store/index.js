const Cookie = process.client ? require('js-cookie') : undefined
const cookieparser = process.server ? require('cookieparser') : undefined

const state = () => ({
  user: {},
  authenticated: false,
  token: '',
  favorites: [],
  pages: [],
  forms: []
})

const actions = {
  nuxtServerInit ({ commit }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        const obj = JSON.parse(parsed[process.env.NUXT_ENV_COOKIE_NAME])
        auth = { authenticated: obj.authenticated, ...obj }
      } catch (err) {

      }
    }
    commit('setAuth', auth)
  }
}

const mutations = {
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
  setAuth (state, payload) {
    Object.assign(state, { ...payload })
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

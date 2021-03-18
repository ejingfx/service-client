const Cookie = process.client ? require('js-cookie') : undefined
const cookieparser = process.server ? require('cookieparser') : undefined

const state = () => ({
  authenticated: false,
  favorites: [],
  forms: [],
  pages: [],
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
        data = { authenticated: obj.authenticated, ...obj }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    }
    commit('setInit', data)
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
  setInit (state, payload) {
    state = Object.assign({}, { ...payload })
  },
  updateCookie (state, payload) {
    Object.assign(state, payload)
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

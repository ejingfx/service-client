const Cookie = require('js-cookie')
// const Cookie = process.client ? require('js-cookie') : undefined
const cookieparser = process.server ? require('cookieparser') : undefined

const state = () => ({
  authenticated: false,
  token: '',
  organziation: [],
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
        auth = { authenticated: obj.authenticated, token: obj.token }
      } catch (err) {
        console.log('err', err)
      }
    }
    console.log('auth', auth)
    commit('setAuth', auth)
  }
}

const mutations = {
  login (state, payload) {
    const data = { authenticated: true, token: payload }
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
  }
}

const getters = {
  getIsAuth: state => state.authenticated,
  getToken: state => state.token
}

export default {
  state,
  actions,
  mutations,
  getters
}

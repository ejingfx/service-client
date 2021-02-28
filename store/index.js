// const Cookie = process.client ? require('js-cookie') : undefined
// const cookieparser = process.server ? require('cookieparser') : undefined

const state = () => ({
  isAuth: true,
  token: '',
  organziation: [],
  favorites: [],
  pages: [],
  forms: []
})

const actions = {
  nuxtServerInit ({ commit }, { req }) {
    // let auth = null
    // if (req.headers.cookie) {
    //   const parsed = cookieparser.parse(req.headers.cookie)

    //   try {
    //     const obj = JSON.parse(parsed[process.env.NUXT_ENV_COOKIE_NAME])
    //     auth = { isAuth: obj.isAuth, token: obj.token }
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }

    // commit('setAuth', auth)
  }
}

const mutations = {
  login (state, payload) {
    const data = { isAuth: true, token: payload }
    Object.assign(state, { ...data })
    // Cookie.set(process.env.NUXT_ENV_COOKIE_NAME, data)
  },
  logout (state) {
    const data = { isAuth: null, token: '' }
    Object.assign(state, { ...data })
    // Cookie.remove(process.env.NUXT_ENV_COOKIE_NAME)
  },
  setAuth (state, payload) {
    Object.assign(state, { ...payload })
  }
}

const getters = {
  getIsAuth: state => state.isAuth,
  getToken: state => state.token
}

export default {
  state,
  actions,
  mutations,
  getters
}

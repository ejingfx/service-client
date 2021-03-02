export default (context, inject) => {
  const api = {
    login: async (payload) => {
      const config = {
        method: 'POST',
        url: '/auth/login',
        data: { ...payload }
      }
      return (await context.$axios(config)).data
    },
    register: async (payload) => {
      const config = {
        method: 'POST',
        url: '/auth/register',
        data: { ...payload }
      }
      return (await context.$axios(config)).data
    }
  }

  inject('api', api)
  context.$api = api
}

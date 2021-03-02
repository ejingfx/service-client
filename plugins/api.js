export default (context, inject) => {
  const api = {
    login: async (payload) => {
      const config = {
        method: 'POST',
        url: '/user/login',
        data: { ...payload }
      }
      return (await context.$axios(config)).data
    },
    register: async (payload) => {
      const config = {
        method: 'POST',
        url: '/user/register',
        data: { ...payload }
      }
      return (await context.$axios(config)).data
    }
  }

  inject('api', api)
  context.$api = api
}
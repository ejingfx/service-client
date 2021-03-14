export default (context, inject) => {
  const updateAccount = async (id, payload) => {
    const config = {
      method: 'PUT',
      url: `${process.env.NUXT_ENV_API_URL}/user/account/${id}`,
      data: { ...payload }
    }
    return (await context.$axios(config)).data
  }

  const updateProfile = async (username, payload) => {
    const config = {
      method: 'PUT',
      url: `${process.env.NUXT_ENV_API_URL}/user/profile/${username}`,
      data: { ...payload }
    }
    return (await context.$axios(config)).data
  }

  const getProfile = async username => {
    const config = {
      method: 'GET',
      url: `${process.env.NUXT_ENV_API_URL}/user/profile/${username}`
    }
    return (await context.$axios(config)).data
  }

  const getAllOrganization = async payload => {
    const config = {
      method: 'POST',
      url: '/organization/all',
      data: { organization: payload }
    }
    return (await context.$axios(config)).data
  }

  const getOrganization = async id => {
    const config = {
      method: 'GET',
      url: `/organization/${id}`
    }
    return (await context.$axios(config)).data
  }

  const login = async payload => {
    const config = {
      method: 'POST',
      url: '/auth/login',
      data: { ...payload }
    }
    return (await context.$axios(config)).data
  }

  const register = async payload => {
    const config = {
      method: 'POST',
      url: '/auth/register',
      data: { ...payload }
    }
    return (await context.$axios(config)).data
  }

  const api = {
    getAllOrganization,
    getOrganization,
    getProfile,
    updateAccount,
    updateProfile,
    login,
    register
  }

  inject('api', api)
  context.$api = api
}

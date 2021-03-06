export default (context, inject) => {
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
    login,
    register
  }

  inject('api', api)
  context.$api = api
}

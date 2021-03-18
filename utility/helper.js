import _ from 'lodash'

export const formatCookiePayload = params => {
  const state = params.state
  const key = _.findKey(state, params.key)
  state[key] = params.data
  const result = { ...state }
  console.log('result', result)
  return result
}

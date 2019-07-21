import * as types from '../constants/ActionTypes'

const login = (state = {
  personalInfo: { },
  cardPayResult: {},
}, action) => {
  const { type, payload } = action
  switch (type) {
    case types.LOGIN:
      return Object.assign({}, state, { personalInfo: payload })
    case types.POST_CARD_PAY:
      return Object.assign({}, state, { cardPayResult: payload })
    default:
      return state
  }
}

export default login

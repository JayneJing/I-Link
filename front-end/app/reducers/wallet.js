import * as types from '../constants/ActionTypes'

const wallet = (state = {
  walletInfo: {
    address: "AL6YBSSi9rJwkxSHc3K6tq8Zy53Nji4aRP",
    role:'donator'
  },
  walletBalance: {
    ont:10000,
  },
  breadValue: 0,
  transforHistory:'',
  transforHistoryForDonator:'',
  transforHistoryForVested:'',
  transforHistoryForCharity:'',
  transforHistoryForActuator:'',
  transforHistoryForProvider:'',
}, action) => {
  const { type, payload } = action
  switch (type) {
    case types.SET_WALLET_INFO:
      return Object.assign({}, state, { walletInfo: payload })
    case types.SET_WALLET_BALANCE:
      return Object.assign({}, state, { walletBalance: payload })
    case types.SET_BREAD_VALUE:
      return Object.assign({}, state, { breadValue: payload })
    case types.SET_TRANSFOR_HISTORY:
      return Object.assign({}, state, { transforHistory: payload })
    case types.SET_TRANSFOR_HISTORY_FOR_DONATOR:
      return Object.assign({}, state, { transforHistoryForDonator: payload })
    case types.SET_TRANSFOR_HISTORY_FOR_VESTED:
      return Object.assign({}, state, { transforHistoryForVested: payload })
    case types.SET_TRANSFOR_HISTORY_FOR_CHARITY:
      return Object.assign({}, state, { transforHistoryForCharity: payload })
    case types.SET_TRANSFOR_HISTORY_FOR_ACTUATOR:
      return Object.assign({}, state, { transforHistoryForActuator: payload })
    case types.SET_TRANSFOR_HISTORY_FOR_PROVIDER:
      return Object.assign({}, state, { transforHistoryForProvider: payload })
    default:
      return state
  }
}

export default wallet

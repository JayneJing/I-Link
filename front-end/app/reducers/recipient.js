import * as types from '../constants/ActionTypes'

const recipient = (state = {
  recipientInfo: {},
  recipientProjectList: {},
  recipientContent: {},
  allApplyProjectList: [],
  confirmApplyStatus: {},
}, action) => {
  const { type, payload } = action
  switch (type) {
    case types.POST_CREAT_PROJECT:
      return Object.assign({}, state, { recipientInfo: payload })
    case types.GET_RECIPENT_LIST:
      return Object.assign({}, state, { recipientProjectList: payload })
    case types.GET_RECIPENT_CONTENT:
      return Object.assign({}, state, { recipientContent: payload })
    case types.GET_ALL_APPLY_LIST:
      return Object.assign({}, state, { allApplyProjectList: payload })
    case types.GET_CONFIRM_APPLY:
      return Object.assign({}, state, { confirmApplyStatus: payload })
    default:
      return state
  }
}

export default recipient

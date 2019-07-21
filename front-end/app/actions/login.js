import {
  API_LOGIN,
  API_REGISTER,
  API_GET_PERSONAL_INFO,
  API_POST_CARD_PAY,
} from '../constants/API'
import RestfulAPIUtils from '../Utils/RestfuAPIUtils'
import * as types from '../constants/ActionTypes'

export const login = ($address,$role) => {
  return async (dispatch) => {
    try {
      const result = await RestfulAPIUtils.get(API_LOGIN, { params: { walletAddress: $address, role: $role } })
      if (result.status === 200) {
        dispatch({ type: types.LOGIN, payload: result.data })
      } else {
        throw result.status.message
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export const register = ($personalInfo) => {
  console.log($personalInfo)
  return async (dispatch) => {
    try {
      const result = await RestfulAPIUtils.post(API_REGISTER, $personalInfo)
      console.log(result)
      if (result.status === 200) {
        //dispatch({ type: types.LOGIN, payload: result.data })
      } else {
        throw result.status.message
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export const getPersonalInfo = ($address,$role) => {
  return async (dispatch) => {
    try {
      const result = await RestfulAPIUtils.get(API_GET_PERSONAL_INFO, { params: {  role: $role, walletAddress: $address } })
      if (result.status === 200) {
        dispatch({ type: types.LOGIN, payload: result.data })
      } else {
        throw result.status.message
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export const cardPay = ($params) => {
  return async (dispatch) => {
    try {
      const result = await RestfulAPIUtils.post( API_POST_CARD_PAY, $params)
      console.log(result)
      if (result.status === 200) {
        dispatch({ type: POST_CARD_PAY, payload: result.data })
      } else {
        throw result.status.message
      }
    } catch (e) {
      console.error(e)
    }
  }
}
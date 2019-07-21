import {
  API_GET_BALANCE,
  API_GET_TRANSFOR_HISTORY,
  API_GET_TRANSFOR_VESTED,
  API_GET_SMART_CODE_BY_HASH
} from '../constants/API'
import RestfulAPIUtils from '../Utils/RestfuAPIUtils'
import * as types from '../constants/ActionTypes'
import {API_LOGIN} from "../constants/API";

export const setWalletInfo = ($walletInfo) => {
  return  (dispatch) => {
    dispatch({type: types.SET_WALLET_INFO, payload: $walletInfo})
  }
}

export const getBalance = ($address) => {
  return async (dispatch) => {
    try {
      const result = await RestfulAPIUtils.get(API_GET_BALANCE + $address)
      if (result.status === 200) {
        dispatch({type: types.SET_WALLET_BALANCE, payload: result.data.Result.ont})
      } else {
        throw result.status.message
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export const getSmartCodeByHash = ($hash) => {
  return async (dispatch) => {
    try {
      const result = await RestfulAPIUtils.get(API_GET_SMART_CODE_BY_HASH + $hash)
      console.log(result)
      if (result.status === 200) {
        dispatch({ type: types.SET_BREAD_VALUE, payload: result.data })
      } else {
        throw result.status.message
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export const getTransforHistory = ($address,$type,$table) => {
  const params = {
    wallet_address: $address,
    type: $type
  }
  return async (dispatch) => {
    try {
      const result = await RestfulAPIUtils.get(API_GET_TRANSFOR_HISTORY, { params: params })
      if (result.status === 200) {
        if ($table) {
          switch($table) {
            case 'donator':
              dispatch({ type: types.SET_TRANSFOR_HISTORY_FOR_DONATOR, payload: result.data })
              return
            case 'charity':
              dispatch({ type: types.SET_TRANSFOR_HISTORY_FOR_CHARITY, payload: result.data })
              return
            case 'actuator':
              dispatch({ type: types.SET_TRANSFOR_HISTORY_FOR_ACTUATOR, payload: result.data })
              return
            case 'provider':
              dispatch({ type: types.SET_TRANSFOR_HISTORY_FOR_PROVIDER, payload: result.data })
              return
          }
        }else {
          dispatch({ type: types.SET_TRANSFOR_HISTORY, payload: result.data })
        }

      } else {
        throw result.status.message
      }
    } catch (e) {
      console.error(e)
    }
  }
}
export const getVestedTransforHistory = () => {
  return async (dispatch) => {
    try {
      const result = await RestfulAPIUtils.get(API_GET_TRANSFOR_VESTED)
      if (result.status === 200) {
          dispatch({ type: types.SET_TRANSFOR_HISTORY_FOR_VESTED, payload: result.data })
      } else {
        throw result.status.message
      }
    } catch (e) {
      console.error(e)
    }
  }
}

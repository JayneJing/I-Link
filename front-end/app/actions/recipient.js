import {
  API_POST_CREAT_PROJECT,
  API_GET_RECIPENT_LIST,
  API_GET_RECIPENT_CONTENT,
  API_GET_ALL_APPLY_LIST,
  API_GET_CONFIRM_APPLY,
} from '../constants/API'
import RestfulAPIUtils from '../Utils/RestfuAPIUtils'
import * as types from '../constants/ActionTypes'

export const creatRecipient = (params) => {
  return async (dispatch) => {
    try {
      const result = await RestfulAPIUtils.post(API_POST_CREAT_PROJECT, params)
      if (result.status === 201) {
        dispatch({ type: types.POST_CREAT_PROJECT, payload: { result: "success" } })
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export const getRecipientProjectList = ($params) => {
  return async (dispatch) => {
    try {
      const result = await RestfulAPIUtils.get(API_GET_RECIPENT_LIST, { params: $params })
      if (result.status === 200) {
        dispatch({ type: types.GET_RECIPENT_LIST, payload: result.data })
      } else {
        throw result.status.message
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export const getRecipientProjectContent = ($params) => {
  return async (dispatch) => {
    try {
      const result = await RestfulAPIUtils.get(API_GET_RECIPENT_CONTENT, { params: $params })
      if (result.status === 200) {
        dispatch({ type: types.GET_RECIPENT_CONTENT, payload: result.data })
      } else {
        throw result.status.message
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export const getAllApplyProjectList = ($params) => {
  return async (dispatch) => {
    try {
      const result = await RestfulAPIUtils.get(API_GET_ALL_APPLY_LIST, {  params: $params })
      if (result.status === 200) {
        dispatch({ type: types.GET_ALL_APPLY_LIST, payload: result.data })
      } else {
        throw result.status.message
      }
    } catch (e) {
      console.error(e)
    }
  }
}

export const confirmApply = (id) => {
  const $params = {
    project_id: id,
  }
  return async (dispatch) => {
    try {
      const result = await RestfulAPIUtils.get(API_GET_CONFIRM_APPLY, {  params: $params })
      if (result.status === 201) {
        dispatch({ type: types.GET_CONFIRM_APPLY, payload: { result: "success" } })
      }
    } catch (e) {
      console.error(e)
    }
  }
}
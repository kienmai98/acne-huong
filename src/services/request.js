import axios from 'axios'
import queryString from 'query-string'
import { API_SERVER } from '../config/constant'
import webStorage from '../utils/webStorage'

const baseApiConfig = {
  baseURL: `${API_SERVER}`,
  headers: {
    'content-type': 'application/json',
  },
  timeout: 600000, // 600s = 10 mins
  paramsSerializer: {
    serialize: queryString.stringify,
  },
}

const SESSION_EXPIRED_STATUS_CODE = 401

const baseApiClient = axios.create(baseApiConfig)

const request = ({
  enableFlashMessageError = true,
  enableFlashMessageSuccess = false,
  isAuth = true,
  ...options
}) => {
  if (isAuth) {
    const accessToken = webStorage.getToken()
    baseApiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  }

  const onSuccess = (response) => {
    if (enableFlashMessageSuccess) {
      // toast.success("Yêu cầu được xử lý thành công!");
    }
    return response
  }

  const onError = (error) => {
    if (
      error?.response?.status !== SESSION_EXPIRED_STATUS_CODE &&
      enableFlashMessageError
    ) {
      // toast.error("Yêu cầu xử lí thất bại!");
    }

    if (error?.response?.status === SESSION_EXPIRED_STATUS_CODE) {
      webStorage.remove()
    }

    return Promise.reject(error.response)
  }

  return baseApiClient(options).then(onSuccess).catch(onError)
}

export default request

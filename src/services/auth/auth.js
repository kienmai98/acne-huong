import request from '../request'

export const authApi = async (data) =>
  request({
    url: 'api/auth/sign-in',
    method: 'POST',
    data,
    enableFlashMessageSuccess: true,
    enableFlashMessageError: true,
  })

export const getMeApi = async () =>
  request({
    url: 'api/users/me',
    method: 'GET',
  })

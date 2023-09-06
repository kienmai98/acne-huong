import request from '../request'

export const getSlidersApi = async (params) =>
  request({
    url: '/api/sliders',
    method: 'GET',
    params,
  })

export const insertSliderApi = async (data) =>
  request({
    url: '/api/sliders',
    method: 'POST',
    data,
    enableFlashMessageSuccess: true,
  })

export const updateSliderApi = async ({ _id, ...data }) =>
  request({
    url: `/api/sliders/${_id}`,
    method: 'PUT',
    data,
    enableFlashMessageSuccess: true,
  })

export const deleteSliderApi = async (id) =>
  request({
    url: `/api/sliders/${id}`,
    method: 'DELETE',
    enableFlashMessageSuccess: true,
  })

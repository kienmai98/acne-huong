import request from '../request'

export const getCategoriesApi = () =>
  request({
    url: '/api/categories',
    method: 'GET',
  })

export const getCategoryApi = (id) =>
  request({
    url: `/api/categories/${id}`,
    method: 'GET',
  })

export const insertCategoryApi = (data) =>
  request({
    url: `/api/categories`,
    method: 'POST',
    data,
    enableFlashMessageSuccess: true,
  })

export const updateCategoryApi = ({ _id, ...data }) =>
  request({
    url: `/api/categories/${_id}`,
    method: 'PUT',
    data,
    enableFlashMessageSuccess: true,
  })

export const deleteCategoryApi = (id) =>
  request({
    url: `/api/categories/${id}`,
    method: 'DELETE',
    enableFlashMessageSuccess: true,
  })

import request from '../request'

export const getUrlUploadApi = async (data) =>
  request({
    url: `api/upload/s3/post-pre-signUrl`,
    method: 'POST',
    data,
  })

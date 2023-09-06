'use-client'

import { Button, Form, Input, Modal, Select, Progress, message } from 'antd'
import { useState } from 'react'
import { useMount } from 'ahooks'
import axios from 'axios'
import LazyImage from 'components/common/LazyImage'
import { useGetCategories } from 'hooks/useGetCategories'
import { getUrlUploadApi } from 'services/video/upload'
import convertObjectToFormData from 'utils/convertObjectToFormData'
import VideoPlayer from 'components/VideoPlay'
import FileInput from 'components/common/FileInput'

const { TextArea } = Input

const AddEditVideo = ({
  visible,
  onCancel,
  $type = 'ADD',
  onSubmit,
  loading,
  initialValues,
}: any) => {
  const [form] = Form.useForm()
  const { categories } = useGetCategories()

  const [imageUrl, setImageUrl] = useState()
  const [videoUrl, setVideoUrl] = useState()
  const [uploadedImage, setUploadedImage] = useState(0)
  const [uploadedVideo, setUploadedVideo] = useState(0)

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  }
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  }

  const onChangeThumbnail = async (e: any) => {
    try {
      const file = e.target.files[0]

      const fields = await getUrlUploadApi({ fileName: file?.name })

      const data = convertObjectToFormData({
        ...fields?.data?.fields,
        file,
      })

      const res = await axios({
        baseURL: fields?.data?.url,
        method: 'POST',
        data,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1),
          )
          setUploadedImage(percentCompleted)
        },
      })

      form.setFieldsValue({ thumbnail: res?.data?.data?.filePath })

      setImageUrl(res?.data?.data?.filePath)
      message.success('Yêu cầu được xử lý thành công!')
    } catch (error) {
      message.error('Yêu cầu xử lí thất bại!')
    }
  }

  const onChangeVideo = async (e: any) => {
    try {
      const file = e.target.files[0]

      const fields = await getUrlUploadApi({ fileName: file?.name })

      const data = convertObjectToFormData({
        ...fields?.data?.fields,
        file,
      })

      const res = await axios({
        baseURL: fields?.data?.url,
        method: 'POST',
        data,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1),
          )
          setUploadedVideo(percentCompleted)
        },
      })

      form.setFieldsValue({ video: res?.data?.data?.filePath })

      setVideoUrl(res?.data?.data?.filePath)
      message.success('Yêu cầu được xử lý thành công!')
    } catch (error) {
      message.error('Yêu cầu xử lí thất bại!')
    }
  }

  const onChangeCategory = (value: string) => {
    form.setFieldsValue({ categoryId: value })
  }

  const onFinish = async (data: any) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onSubmit && (await onSubmit(data))
      form.resetFields()
      onCancel()
    } catch (error) {
      console.error(error)
    }
  }

  useMount(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
      setImageUrl(initialValues.thumbnail)
      setVideoUrl(initialValues.video)
    }
  })

  return (
    <Modal
      title={$type === 'ADD' ? 'Tạo mới' : 'Cập nhật'}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        {...layout}
        form={form}
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item
          name="title"
          label="Tiêu đề phim:"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="categoryIds"
          label="Danh mục"
          rules={[{ required: true, message: 'Vui lòng nhập danh mục' }]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn danh mục..."
            onChange={onChangeCategory}
            allowClear
            options={categories}
          />
        </Form.Item>
        <Form.Item
          name="thumbnail"
          label="Ảnh bìa"
          rules={[{ required: true, message: 'Vui lòng thêm ảnh bìa' }]}
        >
          <FileInput
            id="thumbnail"
            name="thumbnail"
            onChange={onChangeThumbnail}
            accept="image/*"
          />
          {uploadedImage > 0 && <Progress percent={uploadedImage} />}
          {!!imageUrl && (
            <LazyImage
              src={imageUrl}
              alt="avatar"
              style={{
                width: '100%',
              }}
            />
          )}
        </Form.Item>
        <Form.Item
          name="video"
          label="Phim"
          rules={[{ required: true, message: 'Vui lòng thêm phim' }]}
        >
          <FileInput
            id="video"
            name="video"
            onChange={onChangeVideo}
            accept="video/*"
          />
          {uploadedVideo > 0 && <Progress percent={uploadedVideo} />}
          {!!videoUrl && <VideoPlayer url={videoUrl} />}
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả/ nội dung"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả/ nội dung' }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button loading={loading} htmlType="submit" className="button-main">
            {$type === 'ADD' ? 'Tạo mới' : 'Cập nhật'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddEditVideo

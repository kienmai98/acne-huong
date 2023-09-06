import { useMount } from 'ahooks'
import { Button, Form, Modal, Progress } from 'antd'
import axios from 'axios'
import FileInput from 'components/common/FileInput'
import LazyImage from 'components/common/LazyImage'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { getUrlUploadApi } from 'services/video/upload'
import convertObjectToFormData from 'utils/convertObjectToFormData'

const AddEditSlider = ({
  visible,
  onCancel,
  $type = 'ADD',
  onSubmit,
  loading,
  initialValues,
}: any) => {
  const [form] = Form.useForm()

  const [imageUrl, setImageUrl] = useState()
  const [uploadedImage, setUploadedImage] = useState(0)

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

  const onFinish = async (data: any) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onSubmit && (await onSubmit(data))
      form.resetFields()
      onCancel()
    } catch (error) {
      console.warn(error)
    }
  }

  const onChangeImage = async (e: any) => {
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

      form.setFieldsValue({ image: res?.data?.data?.filePath })

      setImageUrl(res?.data?.data?.filePath)
      toast.success('Yêu cầu được xử lý thành công!')
    } catch (error) {
      toast.error('Yêu cầu xử lí thất bại!')
    }
  }

  useMount(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
      setImageUrl(initialValues.image)
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
          name="image"
          label="Banner"
          rules={[{ required: true, message: 'Vui lòng thêm banner' }]}
        >
          <FileInput
            id="image"
            name="image"
            onChange={onChangeImage}
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

        <Form.Item {...tailLayout}>
          <Button loading={loading} htmlType="submit" className="button-main">
            {$type === 'ADD' ? 'Tạo mới' : 'Cập nhật'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddEditSlider

'use client'

/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Button, Form, Input, Modal } from 'antd'
import { useUpdateEffect } from 'ahooks'

const AddEditCategory = ({
  visible,
  onCancel,
  $type = 'ADD',
  onSubmit,
  loading,
  initialValues,
}: any) => {
  const [form] = Form.useForm()

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
      onSubmit && (await onSubmit(data))
      form.resetFields()
      onCancel()
    } catch (error) {
      console.warn(error)
    }
  }

  useUpdateEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues, form])

  return (
    <Modal
      title={$type === 'ADD' ? 'Tạo mới' : 'Cập nhật'}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item
          name="title"
          label="Tên danh mục"
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
        >
          <Input />
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

export default AddEditCategory

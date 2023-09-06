'use client'

/* eslint-disable no-underscore-dangle */
import { useSetState, useRequest } from 'ahooks'
import { Row, Col, Button, Modal, Table } from 'antd'
import AddEditSlider from 'components/admin/add-edit-slider'
import LazyImage from 'components/common/LazyImage'
import { CacheKey } from 'config/cache-key'
import dayjs from 'dayjs'
import useToggle from 'hooks/use-toggle'
import { useState } from 'react'
import {
  deleteSliderApi,
  getSlidersApi,
  insertSliderApi,
  updateSliderApi,
} from 'services/sliders/slider'

const Page = () => {
  const [detailSlider, setDetailSlider] = useState<any>()

  const editModal = useToggle()
  const addModal = useToggle()

  const [filter, setFilter] = useSetState({
    page: 1,
    pageSize: 20,
  })

  const {
    data,
    loading,
    run: getList,
  } = useRequest(() => getSlidersApi(filter), {
    cacheKey: CacheKey.BANNERS,
    refreshDeps: [filter],
  })

  const { run: insertSlider, loading: addLoading } = useRequest(
    (data) => insertSliderApi(data),
    {
      manual: true,
      onSuccess: getList,
    },
  )

  const { run: updateSlider, loading: updateLoading } = useRequest(
    // eslint-disable-next-line no-underscore-dangle
    (data) => updateSliderApi({ _id: detailSlider?._id, ...data }),
    {
      manual: true,
      onSuccess: getList,
    },
  )

  const { run: deleteSlider } = useRequest(deleteSliderApi, {
    manual: true,
    onSuccess: getList,
  })

  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (_: any, _$: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image: any) => <LazyImage width={200} src={image} />,
    },

    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: any) => dayjs(createdAt).format('DD/MM/YYYY'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Row gutter={24}>
          <Col>
            <Button className="button-main" onClick={onOpenEdit(record)}>
              Cập nhật
            </Button>
          </Col>
          <Col>
            <Button type="primary" danger onClick={handleDelete(record)}>
              Xóa
            </Button>
          </Col>
        </Row>
      ),
    },
  ]

  const handleChangePage = (page: number) => {
    setFilter({ page })
  }

  const onOpenEdit = (record: number) => () => {
    setDetailSlider(record)
    editModal.toggle()
  }

  const onCancelEdit = () => {
    setDetailSlider('')
    editModal.toggle()
  }

  const handleDelete = (record: any) => () => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa?',
      onOk() {
        deleteSlider(record._id)
      },
      okText: 'Xóa',
      cancelText: 'Hủy',
      okButtonProps: { danger: true },
    })
  }

  return (
    <Row gutter={[0, 24]} className="container mx-auto my-24">
      <Col lg={24}>
        <Row justify="space-between" align="middle">
          <Col>
            <h1 className="heading">ADMIN</h1>
            <p className="sub-heading">
              Choose what you want with your category
            </p>
          </Col>
          <Col>
            <div className="flex justify-end items-center gap-6">
              <Button className="button-main" onClick={addModal.toggle}>
                Tạo mới
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
      <Col span={24} className="my-7 mx-0">
        <Table
          className="table-main"
          columns={columns}
          rowKey="_id"
          dataSource={data?.data?.data}
          loading={loading}
          pagination={{
            current: filter.page,
            total: data?.data?.pagination?.total,
            onChange: handleChangePage,
            pageSize: filter.pageSize,
            hideOnSinglePage: true,
            showSizeChanger: false,
          }}
        />
        {editModal.visible && (
          <AddEditSlider
            $type="EDIT"
            visible={editModal.visible}
            onCancel={onCancelEdit}
            initialValues={detailSlider}
            onSubmit={updateSlider}
            loading={updateLoading}
          />
        )}
        {addModal.visible && (
          <AddEditSlider
            visible={addModal.visible}
            onCancel={addModal.toggle}
            onSubmit={insertSlider}
            loading={addLoading}
          />
        )}
      </Col>
    </Row>
  )
}

export default Page

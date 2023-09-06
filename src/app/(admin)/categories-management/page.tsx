'use client'

/* eslint-disable no-underscore-dangle */
import { useSetState, useRequest } from 'ahooks'
import { Row, Col, Button, Modal, Table } from 'antd'
import AddEditCategory from 'components/admin/add-edit-category'
import { CacheKey } from 'config/cache-key'
import dayjs from 'dayjs'
import useToggle from 'hooks/use-toggle'
import React, { useState } from 'react'
import {
  getCategoriesApi,
  insertCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
} from 'services/video/category'

const Page = () => {
  const [detailCategory, setDetailCategory] = useState<any>()

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
  } = useRequest(() => getCategoriesApi(filter), {
    cacheKey: CacheKey.CATEGORIES,
    refreshDeps: [filter],
  })

  const { run: insertCategory, loading: addLoading } = useRequest(
    (data) => insertCategoryApi(data),
    {
      manual: true,
      onSuccess: getList,
    },
  )

  const { run: updateCategory, loading: updateLoading } = useRequest(
    (data) => updateCategoryApi({ _id: detailCategory?._id, ...data }),
    {
      manual: true,
      onSuccess: getList,
    },
  )

  const { run: deleteCategory } = useRequest((id) => deleteCategoryApi(id), {
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
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
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

  const onOpenEdit = (record: any) => () => {
    setDetailCategory(record)
    editModal.toggle()
  }

  const onCancelEdit = () => {
    setDetailCategory('')
    editModal.toggle()
  }

  const handleDelete = (record: any) => () => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa?',
      onOk() {
        deleteCategory(record._id)
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
        <AddEditCategory
          $type="EDIT"
          visible={editModal.visible}
          onCancel={onCancelEdit}
          initialValues={detailCategory}
          onSubmit={updateCategory}
          loading={updateLoading}
        />
        <AddEditCategory
          visible={addModal.visible}
          onCancel={addModal.toggle}
          onSubmit={insertCategory}
          loading={addLoading}
        />
      </Col>
    </Row>
  )
}

export default Page

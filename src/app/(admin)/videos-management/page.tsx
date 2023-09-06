'use client'

import { Col, Row, Table, Button, Input, Modal } from 'antd'
import { useState } from 'react'

import { useRequest, useSetState } from 'ahooks'
import dayjs from 'dayjs'
import { useGetCategories } from 'hooks/useGetCategories'
import AddEditVideo from 'components/admin/add-edit-video'
import {
  getListApi,
  insertVideoApi,
  updateVideoApi,
  deleteVideoApi,
} from 'services/video/video'
import useToggle from 'hooks/use-toggle'
import { Box } from 'components/Box'
import { CacheKey } from 'config/cache-key'

const { Search } = Input

const VideoManager = () => {
  const { categories } = useGetCategories()
  const [detailVideo, setDetailVideo] = useState<any>()

  const editModal = useToggle()
  const addModal = useToggle()

  const [filter, setFilter] = useSetState({
    page: 1,
    pageSize: 20,
    search: '',
  })

  const {
    data,
    loading,
    run: getList,
  } = useRequest(() => getListApi(filter), {
    cacheKey: CacheKey.VIDEOS_MANAGEMENT,
    refreshDeps: [filter],
  })

  const { run: insertVideo, loading: addLoading } = useRequest(
    (data) => insertVideoApi(data),
    {
      manual: true,
      onSuccess: getList,
    },
  )

  const { run: updateVideo, loading: updateLoading } = useRequest(
    // eslint-disable-next-line no-underscore-dangle
    (data) => updateVideoApi({ _id: detailVideo?._id, ...data }),
    {
      manual: true,
      onSuccess: getList,
    },
  )

  const { run: deleteVideo } = useRequest(deleteVideoApi, {
    manual: true,
    onSuccess: getList,
  })

  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (_: any, __: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryIds',
      key: 'categoryIds',
      render: (categoryIds: any) => {
        const category = categories?.filter((item: any) =>
          categoryIds?.includes(item.value),
        )

        return <p>{category?.map((item: any) => item.label)?.join(', ')}</p>
      },
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
        <Box className="flex item-center gap-2">
          <Button className="button-main" onClick={onOpenEdit(record)}>
            Cập nhật
          </Button>
          <Button
            type="primary"
            className="button-main"
            danger
            onClick={handleDelete(record)}
          >
            Xóa
          </Button>
        </Box>
      ),
    },
  ]

  const handleChangePage = (page: number) => {
    setFilter({ page })
  }

  const onOpenEdit = (record: any) => () => {
    setDetailVideo(record)
    editModal.toggle()
  }

  const onCancelEdit = () => {
    setDetailVideo('')
    editModal.toggle()
  }

  const onSearch = (value: string) => setFilter({ search: value, page: 1 })

  const handleDelete = (record: any) => () => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa?',
      onOk() {
        // eslint-disable-next-line no-underscore-dangle
        deleteVideo(record._id)
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
            <h1>ADMIN</h1>
            <p>Choose what you want with your videos</p>
          </Col>
          <Col>
            <div className="flex justify-end items-center gap-6">
              <Search
                placeholder="Tìm kiếm theo tên..."
                onSearch={onSearch}
                style={{ width: 200 }}
              />
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
          <AddEditVideo
            $type="EDIT"
            visible={editModal.visible}
            onCancel={onCancelEdit}
            initialValues={detailVideo}
            onSubmit={updateVideo}
            loading={updateLoading}
          />
        )}

        {addModal.visible && (
          <AddEditVideo
            visible={addModal.visible}
            onCancel={addModal.toggle}
            onSubmit={insertVideo}
            loading={addLoading}
          />
        )}
      </Col>
    </Row>
  )
}

export default VideoManager

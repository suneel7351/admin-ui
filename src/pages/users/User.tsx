import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Breadcrumb, Button, Drawer, Flex, Form, Space, Spin, Table, Typography, theme } from 'antd'
import { Link, Navigate } from 'react-router-dom'
import { createUser, getUsers } from '../../http/api'
import { useAuthStore } from '../../store'
import Filter from './Filter'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { useState } from 'react'
import UserForm from './forms/UserForm'
import { UserData } from '../../types'
import { PER_PAGE } from '../../constant'

function Users() {
  const [queryParams, setQueryParams] = useState({
    skip: PER_PAGE,
    page: 1
  })
  const {
    token: { colorBgLayout },
  } = theme.useToken();
  const [form] = Form.useForm()
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuthStore()
  const { data: users, error, isFetching } = useQuery({
    queryKey: ['users', queryParams],
    queryFn: async () => {
      const queryString = new URLSearchParams(queryParams as unknown as Record<string, string>).toString()
      return getUsers(queryString).then((res) => res.data)
    },
    placeholderData:keepPreviousData
  })

  const createUserData = async (userData: UserData) => {
    return await createUser(userData)
  }
  const { mutate } = useMutation({
    mutationKey: ["add_user"],
    mutationFn: createUserData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
    }
  ]
  const handleSubmit = async () => {
    await form.validateFields()
    await mutate(form.getFieldsValue())
    form.resetFields()
    setIsOpen(false)
  }

  if (user?.role !== "admin") return <Navigate to={"/"} replace={true} />
  return (
    <>
      <Space style={{ width: "100%" }} size={"large"} direction='vertical'>




        <Flex justify='space-between'>
          <Breadcrumb items={[{ title: <Link to={"/"}>Dashboard</Link> }, { title: "Users" }]} />
          {
            isFetching && <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          }

          {
            error && <Typography.Text type='danger'>{error.message}</Typography.Text>
          }
        </Flex>

        <Filter onFilterChange={(name: string, value: string) => {
          console.log(name, value);

        }} >
          <Button onClick={() => setIsOpen(true)} type='primary' icon={<PlusOutlined />}>Add User</Button>
        </Filter>
        <Table
          pagination={{
            total: users?.total,
            pageSize: queryParams.skip,
            current: queryParams.page,
            onChange: (page) => {
              setQueryParams((prev) => {
                return {
                  ...prev,
                  page
                }

              })

            }

          }}
          columns={columns} dataSource={users?.users} rowKey={"_id"} />

        <Drawer styles={{ body: { background: colorBgLayout } }} title="Create User" width={640} onClose={() => setIsOpen(false)} open={isOpen} extra={
          <Space size="middle">
            <Button onClick={() => {
              setIsOpen(false)
              form.resetFields()
            }}>Cancel</Button>
            <Button type='primary' onClick={handleSubmit}>Submit</Button>
          </Space>
        }>
          <Form layout='vertical' form={form}>
            <UserForm />

          </Form>
        </Drawer>
      </Space>
    </>
  )
}

export default Users
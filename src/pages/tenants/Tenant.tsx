import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Breadcrumb, Button, Card, Col, Drawer, Form, Input, Row, Space, Table, theme } from 'antd'
import { Link, Navigate } from 'react-router-dom'
import { createTenant, getTenants } from '../../http/api'
import { useAuthStore } from '../../store'

import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { TenantData } from '../../types'

function Tenants() {
    const [form] = Form.useForm()
    const {
        token: { colorBgLayout },
    } = theme.useToken();
    const queryClient = useQueryClient()
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useAuthStore()
    const { data: tenants, error, isLoading } = useQuery({
        queryKey: ['tenants'],
        queryFn: async () => {
            return getTenants().then((res) => res.data)
        }
    })

    const createNewTenant = async (tenant:TenantData) => {
        return await createTenant(tenant)
    }
    const { mutate } = useMutation({
        mutationKey: ['create_tenant'],
        mutationFn: createNewTenant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tenants'] })
        }
    })


    const submitHandler = async () => {
        await form.validateFields()        
        await mutate(form.getFieldsValue())
        setIsOpen(false)
        form.resetFields()
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt:string) => {
                const date = new Date(createdAt);
                const formattedDate = date.toLocaleDateString('en-GB'); 
                return formattedDate;
            },
        }
    ]


    if (user?.role !== "admin") return <Navigate to={"/"} replace={true} />
    return (
        <>
            <Space style={{ width: "100%" }} size={"large"} direction='vertical'>




                <Breadcrumb items={[{ title: <Link to={"/"}>Dashboard</Link> }, { title: "Tenants" }]} />
                {
                    isLoading && <div>Loading....</div>
                }

                {
                    error && <div>{error.message}</div>
                }

                <Card >


                    <Row justify={"space-between"}>

                        <Col span={8}>


                            <Input.Search style={{ width: "100%" }} allowClear={true} placeholder='Search Tenant' />

                        </Col>
                        <Col>
                            <Button onClick={() => setIsOpen(true)} type='primary' icon={<PlusOutlined />}>Add Tenant</Button>
                        </Col>

                    </Row>

                </Card>


                <Table columns={columns} dataSource={tenants?.tenants} rowKey={"_id"} />

                <Drawer styles={{ body: { background: colorBgLayout } }} title="Create Tenant" width={500} onClose={() => setIsOpen(false)} open={isOpen} extra={
                    <Space size="middle">
                        <Button onClick={() => {
                            setIsOpen(false)
                            form.resetFields()
                        }}>Cancel</Button>
                        <Button type='primary' onClick={
                            submitHandler
                        }>Submit</Button>
                    </Space>
                }>
                    <Form layout='vertical' form={form}>

                        <Card>
                            <Row>


                                <Col span={24}>
                                    <Form.Item label='Tenant Name' name="name" rules={[{
                                        required: true,
                                        message: "Tenant Name is required."
                                    }]}>
                                        <Input />
                                    </Form.Item>


                                </Col>

                            </Row>   <Row >


                                <Col span={24}>

                                    <Form.Item rules={[{
                                        required: true,
                                        message: "Tenant Address is required."
                                    }]} label='Tenant Address' name="address">
                                        <Input />
                                    </Form.Item>
                                </Col>

                            </Row>

                        </Card>
                    </Form>
                </Drawer>
            </Space>
        </>
    )
}

export default Tenants
import { Card, Col, Form, Input, Row, Select } from 'antd'
import { getTenants } from '../../../http/api'
import { useQuery } from '@tanstack/react-query'
import { Tenant } from '../../../types'
const roles = [{ _id: "admin", name: "Admin" }, { _id: "manager", name: "Manager" }, { _id: "customer", name: "Customer" }]
function UserForm() {
    const { data: tenants, } = useQuery({
        queryKey: ['tenants'],
        queryFn: async () => {
            return getTenants().then((res) => res.data)
        }
    })



    return (

        <Row>
            <Col span={24} >
                <Card title="Basic Info">
                    <Row gutter={10}>

                        <Col span={12}>
                            <Form.Item label='First Name' name="firstName" rules={[{
                                required: true,
                                message: "First Name is required."
                            }]}>
                                <Input />
                            </Form.Item>

                        </Col>
                        <Col span={12}>
                            <Form.Item rules={[{
                                required: true,
                                message: "First Name is required."
                            }]} label='Last Name' name="lastName">
                                <Input />
                            </Form.Item>

                        </Col>

                    </Row>
                    <Row gutter={10}>

                        <Col span={12}>
                            <Form.Item rules={[{
                                required: true,
                                message: "First Name is required.",
                            }, { type: 'email', message: "Invalid Email" }]} label='Email' name="email">
                                <Input />
                            </Form.Item>

                        </Col>
                        <Col span={12}>
                            <Form.Item rules={[{
                                required: true,
                                message: "Phone Number is required."
                            }]} label='Phone Number' name="phone">
                                <Input />
                            </Form.Item>

                        </Col>

                    </Row>
                </Card>


                <Card title="Secuirty Info" style={{ margin: "1.5rem 0" }}>
                    <Row gutter={10}>

                        <Col span={12}>
                            <Form.Item rules={[{
                                required: true,
                                message: "Password is required.",

                            }, { min: 6, message: "Min length 6" }]} label='Password' name="password">
                                <Input type='password' />
                            </Form.Item>

                        </Col>
                        <Col span={12}>
                            <Form.Item rules={[{
                                required: true,
                                message: "Password is required.",

                            }, { min: 6, message: "Min length 6" }]} label='Confirm Password' name="confirmPassword">
                                <Input type='password' />
                            </Form.Item>

                        </Col>

                    </Row>

                </Card>

                <Card title="Auth Info" style={{ marginTop: "1.5rem" }}>
                    <Row gutter={10}>

                        <Col span={12}>

                            <Form.Item rules={[{
                                required: true,
                                message: "Role is required.",

                            }]} label='Role' name="role">
                                <Select style={{ width: "100%" }} placeholder="select Role
                                " allowClear={true} >

                                    {roles?.map((item) => {
                                        return <Select.Option key={item._id}>{item.name}</Select.Option>
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item rules={[{
                                required: true,
                                message: "Restuarent is required.",

                            }]} label='Restaurent' name="tenantId">
                                <Select style={{ width: "100%" }} placeholder="select Restaurent
                                " allowClear={true} >
                                    {tenants?.tenants?.map((item: Tenant) => {
                                        return <Select.Option key={item._id}>{item.name}</Select.Option>
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>

                    </Row>

                </Card>
            </Col>
        </Row>

    )
}

export default UserForm
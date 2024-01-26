import { Card, Col, Form, Input, Row, Select, } from 'antd'
import React from 'react'
interface UserFilterProp {
  children: React.ReactNode
}
function Filter({ children }: UserFilterProp) {
  return (
    <Card >


      <Row justify={"space-between"}>

        <Col span={16}>

          <Row gutter={20}>
            <Col span={8}>
              <Form.Item name={"q"}>
                <Input.Search style={{ width: "100%" }} allowClear={true} placeholder='Search Name'  />
              </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item name={"role"}> 
            <Select  style={{ width: "100%" }} placeholder="select role" allowClear={true} >
                <Select.Option key={"admin"}>Admin</Select.Option>
                <Select.Option key={"manager"}>Manager</Select.Option>
                <Select.Option key={"customer"}>Customer</Select.Option>
              </Select>
            </Form.Item>
            </Col>
            {/* <Col span={8}>
              <Select style={{ width: "100%" }} placeholder="select status" allowClear={true} onChange={(selectedItem)=>onFilterChange("statusQuery",selectedItem)}>
                <Select.Option>Active</Select.Option>
                <Select.Option>Ban</Select.Option>
              </Select>
            </Col> */}
          </Row>
        </Col>
        <Col span={8} style={{ display: "flex", justifyContent: "end" }}>
          {children}

        </Col>

      </Row>

    </Card>
  )
}

export default Filter
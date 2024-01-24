import {  Card, Col, Input, Row, Select, } from 'antd'
import React from 'react'
interface UserFilterProp {
  onFilterChange: (queryName:string,queryValue:string) => void
  children:React.ReactNode
}
function Filter({onFilterChange,children}:UserFilterProp) {
  return (
    <Card >


      <Row justify={"space-between"}>

        <Col span={16}>

          <Row gutter={20}>
            <Col span={8}>
              <Input.Search style={{ width: "100%" }} allowClear={true} placeholder='Search Name'  onChange={(e)=>onFilterChange("searchQuery",e.target.value)}/>
            </Col>
            <Col span={8}>
              <Select style={{ width: "100%" }} placeholder="select role" allowClear={true} onChange={(selectedItem)=>onFilterChange("roleQuery",selectedItem)}>
                <Select.Option>Admin</Select.Option>
                <Select.Option>Manager</Select.Option>
                <Select.Option>Customer</Select.Option>
              </Select>
            </Col>
            <Col span={8}>
              <Select style={{ width: "100%" }} placeholder="select status" allowClear={true} onChange={(selectedItem)=>onFilterChange("statusQuery",selectedItem)}>
                <Select.Option>Active</Select.Option>
                <Select.Option>Ban</Select.Option>
              </Select>
            </Col>
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
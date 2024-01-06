import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store'
import { Avatar, Badge, Dropdown, Flex, Layout, Menu, Space, theme } from 'antd';
import { useState } from 'react';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import { BellFilled, HomeOutlined, RestOutlined, UserOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query';
import { Logout } from '../http/api';


function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const { user, logout } = useAuthStore()


    const { mutate: logoutMutate } = useMutation({
        mutationKey: ['logout'],
        mutationFn: Logout,
        onSuccess: async () => {
            logout()
            return
        }
    })


  
    const items = [
        {
            key: "/",
            icon: <HomeOutlined />,
            label: <NavLink to={"/"}>Home</NavLink>
        },
        {
            key: "/users",
            icon: <UserOutlined />,
            label: <NavLink to={"/users"}>Users</NavLink>
        },
        {
            key: "/kjfs",
            icon: <RestOutlined />,
            label: <NavLink to={"/kjl"}>Rest</NavLink>
        }
    ]

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    if (user === null) return <Navigate replace={true} to={"/auth/login"} />
    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Layout.Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="logo" >
                        <img src="./logo.png" alt="" />
                    </div>
                    <Menu theme="light" defaultSelectedKeys={['/']} mode="inline" items={items} />
                </Layout.Sider>
                <Layout>
                    <Header style={{ paddingLeft: "16px", paddingRight: "16px", background: colorBgContainer }} >

                        <Flex gap="middle" align="start" justify='space-between'>
                            <Badge text="Global" dot={true} status='success' />
                            <Space size={16}>
                                <Badge dot={true}  >
                                    <BellFilled />
                                </Badge>

                                <Dropdown menu={{
                                    items: [
                                        { key: "jlfdj", label: "Logout", onClick: () => logoutMutate() }
                                    ]
                                }} placement="bottomRight">
                                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                </Dropdown>


                            </Space>
                        </Flex>

                    </Header>
                    <Content style={{ margin: '0 16px' }}>

                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        MicroService Full Stack Course
                    </Footer>
                </Layout>
            </Layout>


        </div>
    )
}

export default Dashboard
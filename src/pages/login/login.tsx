import { Alert, Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from "antd"
import { LockFilled, UserOutlined, LockOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from "@tanstack/react-query";
import { credentials } from "../../types";
import { Logout, login, self } from "../../http/api";
import { useAuthStore } from "../../store";
import { usePermission } from "../../hooks/userPermission";

function LoginPage() {
  const { isAllowed } = usePermission()
  const { setUser, logout } = useAuthStore()
  const loginUser = async (credentials: credentials) => {
    const { data } = await login(credentials)
    return data

  }

  const getSelf = async () => {
    const { data } = await self()
    return data

  }

  const { refetch } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    enabled: false
  })

  const { mutate: logoutMutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: Logout,
    onSuccess: async () => {
      logout()
      return
    }
  })
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginUser,
    onSuccess: async () => {
      const userData = await refetch()

      if (!isAllowed(userData.data)) {
        logoutMutate()
        return
      }

      setUser(userData.data)

    }
  })
  return (


    <Layout style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <Card style={{ width: "300px" }} bordered={false} title={<Space style={{ width: "100%", justifyContent: "center", fontSize: "17px" }}><LockFilled />Sign In</Space>}>


        <Form initialValues={{ remember: true }} onFinish={(values) => {
          mutate({ email: values.username, password: values.password })
          console.warn(values);
        }}>


          {
            isError && <Alert type="error" message={error?.message} />
          }
          <Form.Item name={"username"} rules={[
            {
              type: "email",
              message: "Invalid username"
            }, {
              required: true, message: "Please enter username"
            }
          ]}>
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item name={"password"} rules={[{
            required: true,
            message: "Please enter your password"
          }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Flex justify="space-between">
            <Form.Item name={"remember"} valuePropName="checked">
              <Checkbox >Remember me</Checkbox>

            </Form.Item>
            <a href="" id="forgot-password-link">Forgot password</a>
          </Flex>


          <Form.Item >
            <Button type="primary" htmlType="submit" style={{ width: "100%" }} loading={isPending}>Sign In</Button>
          </Form.Item>
        </Form>



      </Card>
    </Layout>
  )
}

export default LoginPage
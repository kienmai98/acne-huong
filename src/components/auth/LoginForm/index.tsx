import classNames from 'classnames'

import { LockOutlined, MobileOutlined } from '@ant-design/icons'

import { Button, Col, Form, Input, Row } from 'antd'
import styles from './styles.module.scss'

function LoginForm(props: any) {
  const { onFinish } = props

  return (
    <Row align="middle" justify="center">
      <Col className={classNames(styles.formLogin)}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Số điện thoại',
              },
            ]}
          >
            <Input
              className={classNames(styles.formLoginInput)}
              prefix={<MobileOutlined rev={undefined} />}
              placeholder="Số điện thoại"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Xin hãy nhập mật khẩu',
              },
              {
                min: 6,
                message: 'Vui lòng nhập mật khẩu tối thiểu 6 kí tự',
              },
            ]}
          >
            <Input.Password
              className={classNames(styles.formLoginInput)}
              prefix={<LockOutlined rev={undefined} />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <Form.Item className={classNames(styles.loginButtonWrap)}>
            <Button
              htmlType="submit"
              className={classNames(styles.loginButton)}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default LoginForm

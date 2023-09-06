'use client'

import { Row, Tabs } from 'antd'
import LoginForm from 'components/auth/LoginForm'
import { useAuth } from 'contexts/auth'

import { useRouter } from 'next/navigation'
import webStorage from 'utils/webStorage'
import { authApi } from 'services/auth/auth'
import styles from './styles.module.scss'

const { TabPane } = Tabs

const Auth = () => {
  const router = useRouter()
  const { setFirst, setIsAuth, setCurrentUser } = useAuth()

  const handleLogin = async (v: any) => {
    const loginInformation = { email: v.username, password: v.password }
    await authApi(loginInformation)
      .then((res) => {
        webStorage.setToken(res?.data?.data?.accessToken)
        setFirst(false)
        setIsAuth(true)
        setCurrentUser({
          email: res?.data?.data?.email,
          // eslint-disable-next-line no-underscore-dangle
          _id: res?.data?.data?._id,
        })
        router.push('/videos-management')
      })
      .catch((err) => console.warn(err))
  }

  return (
    <Row align="middle" justify="center" className={styles.authWrapper}>
      <Tabs className={styles.authTab} defaultActiveKey="1">
        <TabPane tab="Login" key="1">
          <LoginForm onFinish={handleLogin} />
        </TabPane>
      </Tabs>
    </Row>
  )
}

export default Auth

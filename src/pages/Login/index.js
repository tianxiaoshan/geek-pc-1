import React from 'react'
import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import logo from 'assets/images/logo.png'
import './index.scss'
import { login } from '../../store/actions/login'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    setLoading(true)
    try {
      await dispatch(login(values))
      message.success('登录成功', 1, () => {
        history.push('/home')
      })
    } catch (error) {
      message.warning(error.response.data.message, 1)
      setLoading(false)
    }
  }
  return (
    <div className="login">
      <Card className="login-enter">
        <img src={logo} alt="" className="login-logo" />
        {/* 表单 */}
        <Form
          autoComplete="off"
          size="large"
          validateTrigger={['onChange', 'onBlur']}
          onFinish={onFinish}
          initialValues={{
            mobile: '13911111111',
            code: '246810',
            agree: 'true',
          }}
        >
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: '手机号不能为空',
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号格式错误',
              },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: '验证码不能为空',
              },
              {
                pattern: /^\d{6}$/,
                message: '验证码格式错误',
              },
            ]}
          >
            <Input placeholder="请输入验证码" />
          </Form.Item>

          <Form.Item
            name="agree"
            rules={[
              {
                // 自定义校验规则
                validator(rule, value) {
                  if (value) {
                    // 自定义校验规则 通过这边可以发请求 去看用户名是否重复  重复了就走reject
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('请阅读并同意用户协议'))
                  }
                },
              },
            ]}
            valuePropName="checked"
            wrapperCol={{
              offset: 0.5,
              span: 20,
            }}
          >
            <Checkbox>我已经同意[隐私条款]和[用户协议]</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Login

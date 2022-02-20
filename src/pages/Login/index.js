import React from 'react'
import { Card } from 'antd'
import logo from '../../assets/images/logo.png'
import './index.css'

const Login = () => {
  return (
    <div className="login">
      <Card className="login-enter">
        <img src={logo} alt="" className="login-logo" />
      </Card>
    </div>
  )
}
export default Login

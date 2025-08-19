import React from 'react'
import { BasicLoginPage } from 'yggjs_rlogin'

const BasicLoginWithCaptchaDemo: React.FC = () => {
  const handleLogin = async (payload: any) => {
    console.log('Basic with-captcha login:', payload)
    await new Promise(r => setTimeout(r, 600))
  }

  return (
    <BasicLoginPage
      onLogin={handleLogin}
      title="基础风格登录"
      showCaptcha
    />
  )
}

export default BasicLoginWithCaptchaDemo

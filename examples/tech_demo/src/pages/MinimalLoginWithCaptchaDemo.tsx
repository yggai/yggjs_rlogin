import React from 'react'
import { MinimalLoginPage } from 'yggjs_rlogin'

const MinimalLoginWithCaptchaDemo: React.FC = () => {
  const handleLogin = async (payload: any) => {
    console.log('Minimal with-captcha login:', payload)
    await new Promise(r => setTimeout(r, 600))
  }

  return (
    <MinimalLoginPage
      onLogin={handleLogin}
      title="极简风格登录"
      showCaptcha
    />
  )
}

export default MinimalLoginWithCaptchaDemo

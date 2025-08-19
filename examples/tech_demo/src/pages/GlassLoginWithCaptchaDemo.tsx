import React from 'react'
import { GlassLoginPage } from 'yggjs_rlogin'

const GlassLoginWithCaptchaDemo: React.FC = () => {
  const handleLogin = async (payload: any) => {
    console.log('Glass with-captcha login:', payload)
    await new Promise(r => setTimeout(r, 600))
  }

  return (
    <GlassLoginPage
      onLogin={handleLogin}
      title="玻璃风格登录"
      showCaptcha
    />
  )
}

export default GlassLoginWithCaptchaDemo

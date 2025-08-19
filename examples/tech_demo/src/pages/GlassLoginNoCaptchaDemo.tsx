import React from 'react'
import { GlassLoginPage } from 'yggjs_rlogin'

const GlassLoginNoCaptchaDemo: React.FC = () => {
  const handleLogin = async (payload: any) => {
    console.log('Glass no-captcha login:', payload)
    await new Promise(r => setTimeout(r, 600))
  }

  return (
    <GlassLoginPage
      onLogin={handleLogin}
      title="玻璃风格登录"
      showCaptcha={false}
    />
  )
}

export default GlassLoginNoCaptchaDemo

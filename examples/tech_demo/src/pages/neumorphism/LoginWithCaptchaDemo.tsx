import React from 'react'
import { NeumorphismLoginPage } from 'yggjs_rlogin'

const NeumorphismLoginWithCaptchaDemo: React.FC = () => {
  const handleLogin = async (payload: any) => {
    console.log('Neumorphism with-captcha login:', payload)
    await new Promise(r => setTimeout(r, 600))
  }

  return (
    <NeumorphismLoginPage
      onLogin={handleLogin}
      title="新拟态登录"
      showCaptcha
      showRememberMe
    />
  )
}

export default NeumorphismLoginWithCaptchaDemo

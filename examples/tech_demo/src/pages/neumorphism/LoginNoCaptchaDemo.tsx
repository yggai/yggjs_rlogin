import React from 'react'
import { NeumorphismLoginPage } from 'yggjs_rlogin'

const NeumorphismLoginNoCaptchaDemo: React.FC = () => {
  const handleLogin = async (payload: any) => {
    console.log('Neumorphism no-captcha login:', payload)
    await new Promise(r => setTimeout(r, 600))
  }

  return (
    <NeumorphismLoginPage
      onLogin={handleLogin}
      title="新拟态登录"
      showCaptcha={false}
      showRememberMe
    />
  )
}

export default NeumorphismLoginNoCaptchaDemo

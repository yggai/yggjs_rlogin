import React from 'react'
import { NeumorphismRegisterPage } from 'yggjs_rlogin'

const NeumorphismRegisterWithCaptchaDemo: React.FC = () => {
  const handleRegister = async (payload: any) => {
    console.log('Neumorphism register with-captcha:', payload)
    await new Promise(r => setTimeout(r, 600))
  }

  return (
    <NeumorphismRegisterPage
      onRegister={handleRegister}
      title="新拟态注册"
      showCaptcha
    />
  )
}

export default NeumorphismRegisterWithCaptchaDemo


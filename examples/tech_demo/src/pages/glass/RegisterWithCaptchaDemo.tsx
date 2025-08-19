import React from 'react'
import { GlassRegisterPage } from 'yggjs_rlogin'

const GlassRegisterWithCaptchaDemo: React.FC = () => {
  const handleRegister = async (payload: any) => {
    console.log('Glass register with-captcha:', payload)
    await new Promise(r => setTimeout(r, 600))
  }

  return (
    <GlassRegisterPage
      onRegister={handleRegister}
      title="玻璃风格注册"
      showCaptcha
    />
  )
}

export default GlassRegisterWithCaptchaDemo


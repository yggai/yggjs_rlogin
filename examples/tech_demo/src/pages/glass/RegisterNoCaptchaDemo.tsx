import React from 'react'
import { GlassRegisterPage } from 'yggjs_rlogin'

const GlassRegisterNoCaptchaDemo: React.FC = () => {
  const handleRegister = async (payload: any) => {
    console.log('Glass register no-captcha:', payload)
    await new Promise(r => setTimeout(r, 600))
  }

  return (
    <GlassRegisterPage
      onRegister={handleRegister}
      title="玻璃风格注册"
      showCaptcha={false}
    />
  )
}

export default GlassRegisterNoCaptchaDemo


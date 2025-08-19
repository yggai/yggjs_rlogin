import React from 'react'
import { MinimalRegisterPage } from 'yggjs_rlogin'

const MinimalRegisterWithCaptchaDemo: React.FC = () => {
  const handleRegister = async (payload: any) => {
    console.log('Minimal register with-captcha:', payload)
    await new Promise(r => setTimeout(r, 600))
  }

  return (
    <MinimalRegisterPage
      onRegister={handleRegister}
      title="极简风格注册"
      showCaptcha
    />
  )
}

export default MinimalRegisterWithCaptchaDemo


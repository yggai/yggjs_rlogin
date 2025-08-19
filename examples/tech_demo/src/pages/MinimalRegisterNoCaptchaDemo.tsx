import React from 'react'
import { MinimalRegisterPage } from 'yggjs_rlogin'

const MinimalRegisterNoCaptchaDemo: React.FC = () => {
  const handleRegister = async (payload: any) => {
    console.log('Minimal register no-captcha:', payload)
    await new Promise(r => setTimeout(r, 600))
  }

  return (
    <MinimalRegisterPage
      onRegister={handleRegister}
      title="极简风格注册"
      showCaptcha={false}
    />
  )
}

export default MinimalRegisterNoCaptchaDemo


import React from 'react'
import { BasicRegisterPage } from 'yggjs_rlogin'

const BasicRegisterNoCaptchaDemo: React.FC = () => {
  const handleRegister = async (payload: any) => {
    console.log('Basic register no-captcha:', payload)
    await new Promise(r => setTimeout(r, 600))
  }

  return (
    <BasicRegisterPage
      onRegister={handleRegister}
      title="基础风格注册"
      showCaptcha={false}
    />
  )
}

export default BasicRegisterNoCaptchaDemo


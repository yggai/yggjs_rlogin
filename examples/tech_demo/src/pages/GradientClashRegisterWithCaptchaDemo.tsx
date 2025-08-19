import React from 'react'
import { GradientClashRegisterPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

const GradientClashRegisterWithCaptchaDemo: React.FC = () => {
  const handleRegister = async (payload: any) => {
    console.log('GradientClash with-captcha register:', payload)
    await new Promise(r => setTimeout(r, 600))
  }

  return (
    <GradientClashRegisterPage
      onRegister={handleRegister}
      title="渐变撞色注册"
      showCaptcha
    />
  )
}

export default GradientClashRegisterWithCaptchaDemo


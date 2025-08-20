import React from 'react'
import { RetroPixelRegisterPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

const RetroPixelRegisterWithCaptchaDemo: React.FC = () => {
  const handleRegister = async (payload: any) => {
    console.log('RetroPixel with-captcha register:', payload)
    await new Promise(r => setTimeout(r, 500))
  }

  return (
    <RetroPixelRegisterPage
      onRegister={handleRegister}
      title="注册"
      showCaptcha
      palette="green"
      crtIntensity="medium"
      cursorBlink
    />
  )
}

export default RetroPixelRegisterWithCaptchaDemo


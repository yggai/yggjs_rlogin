import React from 'react'
import { RetroPixelRegisterPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

const RetroPixelRegisterNoCaptchaDemo: React.FC = () => {
  const handleRegister = async (payload: any) => {
    console.log('RetroPixel no-captcha register:', payload)
    await new Promise(r => setTimeout(r, 500))
  }

  return (
    <RetroPixelRegisterPage
      onRegister={handleRegister}
      title="注册"
      showCaptcha={false}
      palette="green"
      crtIntensity="medium"
      cursorBlink
    />
  )
}

export default RetroPixelRegisterNoCaptchaDemo


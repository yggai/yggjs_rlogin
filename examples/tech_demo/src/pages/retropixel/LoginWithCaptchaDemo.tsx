import React from 'react'
import { RetroPixelLoginPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

const RetroPixelLoginWithCaptchaDemo: React.FC = () => {
  const handleLogin = async (payload: any) => {
    console.log('RetroPixel with-captcha login:', payload)
    await new Promise(r => setTimeout(r, 500))
  }

  return (
    <RetroPixelLoginPage
      onLogin={handleLogin}
      title="LOGIN"
      showCaptcha
      palette="green"
      crtIntensity="medium"
      cursorBlink
    />
  )
}

export default RetroPixelLoginWithCaptchaDemo


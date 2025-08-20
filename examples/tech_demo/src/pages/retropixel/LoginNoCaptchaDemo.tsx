import React from 'react'
import { RetroPixelLoginPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

const RetroPixelLoginNoCaptchaDemo: React.FC = () => {
  const handleLogin = async (payload: any) => {
    console.log('RetroPixel no-captcha login:', payload)
    await new Promise(r => setTimeout(r, 500))
  }

  return (
    <RetroPixelLoginPage
      onLogin={handleLogin}
      title="LOGIN"
      showCaptcha={false}
      palette="green"
      crtIntensity="medium"
      cursorBlink
    />
  )
}

export default RetroPixelLoginNoCaptchaDemo


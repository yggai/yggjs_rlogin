import React from 'react'
import { ThreeDGlassLoginPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

const ThreeDGlassLoginNoCaptchaDemo: React.FC = () => {
  const handleLogin = async (payload: any) => {
    console.log('ThreeDGlass no-captcha login:', payload)
    await new Promise(r => setTimeout(r, 500))
  }

  return (
    <ThreeDGlassLoginPage
      onLogin={handleLogin}
      title="三维玻璃登录"
      showCaptcha={false}
      depth={900}
      tiltMax={8}
      envLight={0.4}
    />
  )
}

export default ThreeDGlassLoginNoCaptchaDemo


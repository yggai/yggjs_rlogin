import React from 'react'
import { ThreeDGlassRegisterPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

const ThreeDGlassRegisterNoCaptchaDemo: React.FC = () => {
  const handleRegister = async (payload: any) => {
    console.log('ThreeDGlass no-captcha register:', payload)
    await new Promise(r => setTimeout(r, 500))
  }

  return (
    <ThreeDGlassRegisterPage
      onRegister={handleRegister}
      title="三维玻璃注册"
      showCaptcha={false}
      depth={900}
      tiltMax={8}
      envLight={0.4}
    />
  )
}

export default ThreeDGlassRegisterNoCaptchaDemo


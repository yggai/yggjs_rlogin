import React from 'react'
import { FrostedModalLoginPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

const FrostedLoginNoCaptchaDemo: React.FC = () => {
  const handleLogin = async (payload: any) => {
    console.log('FrostedModal no-captcha login:', payload)
    await new Promise(r => setTimeout(r, 500))
  }

  return (
    <FrostedModalLoginPage
      onLogin={handleLogin}
      title="毛玻璃弹窗登录"
      showCaptcha={false}
      backdropBlur={10}
      overlayDarkness={0.45}
      cardSize={{ width: 400, height: 600 }}
    />
  )
}

export default FrostedLoginNoCaptchaDemo


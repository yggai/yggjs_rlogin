import React from 'react'
import { FrostedModalRegisterPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

const FrostedRegisterNoCaptchaDemo: React.FC = () => {
  const handleRegister = async (payload: any) => {
    console.log('FrostedModal no-captcha register:', payload)
    await new Promise(r => setTimeout(r, 500))
  }

  return (
    <FrostedModalRegisterPage
      onRegister={handleRegister}
      title="毛玻璃弹窗注册"
      showCaptcha={false}
      backdropBlur={10}
      overlayDarkness={0.45}
      cardSize={{ width: 400, height: 600 }}
    />
  )
}

export default FrostedRegisterNoCaptchaDemo


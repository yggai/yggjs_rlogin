import React from 'react'
import { DarkNeonRegisterPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

const DarkNeonRegisterNoCaptchaDemo: React.FC = () => {
  const handleRegister = async (payload: any) => {
    console.log('DarkNeon no-captcha register:', payload)
    await new Promise(r => setTimeout(r, 600))
  }

  return (
    <DarkNeonRegisterPage
      onRegister={handleRegister}
      title="暗黑霓虹注册"
      showCaptcha={false}
      neonColor="#00e6ff"
      glowIntensity="medium"
    />
  )
}

export default DarkNeonRegisterNoCaptchaDemo


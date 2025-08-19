import React from 'react'
import { DarkNeonLoginPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

const DarkNeonLoginNoCaptchaDemo: React.FC = () => {
  const handleLogin = async (payload: any) => {
    console.log('DarkNeon no-captcha login:', payload)
    await new Promise(r => setTimeout(r, 600))
  }

  return (
    <DarkNeonLoginPage
      onLogin={handleLogin}
      title="暗黑霓虹登录"
      showCaptcha={false}
      neonColor="#00e6ff"
      glowIntensity="medium"
    />
  )
}

export default DarkNeonLoginNoCaptchaDemo


import React from 'react'
import { GradientClashLoginPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

const GradientClashLoginNoCaptchaDemo: React.FC = () => {
  const handleLogin = async (payload: any) => {
    console.log('GradientClash no-captcha login:', payload)
    await new Promise(r => setTimeout(r, 600))
  }

  return (
    <GradientClashLoginPage
      onLogin={handleLogin}
      title="渐变撞色登录"
      showCaptcha={false}
    />
  )
}

export default GradientClashLoginNoCaptchaDemo


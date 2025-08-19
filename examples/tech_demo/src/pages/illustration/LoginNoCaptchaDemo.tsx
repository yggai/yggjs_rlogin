import React from 'react'
import { IllustrationLoginPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

const IllustrationLoginNoCaptchaDemo: React.FC = () => {
  const handleLogin = async (payload: any) => {
    console.log('Illustration no-captcha login:', payload)
    await new Promise(r => setTimeout(r, 600))
  }

  return (
    <IllustrationLoginPage
      onLogin={handleLogin}
      title="插画故事登录"
      showCaptcha={false}
      splitRatio={0.6}
    />
  )
}

export default IllustrationLoginNoCaptchaDemo


import React from 'react'
import { IllustrationRegisterPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

const IllustrationRegisterWithCaptchaDemo: React.FC = () => {
  const handleRegister = async (payload: any) => {
    console.log('Illustration with-captcha register:', payload)
    await new Promise(r => setTimeout(r, 600))
  }

  return (
    <IllustrationRegisterPage
      onRegister={handleRegister}
      title="插画故事注册"
      showCaptcha
      splitRatio={0.6}
    />
  )
}

export default IllustrationRegisterWithCaptchaDemo


import React from 'react'
import { SplitBrandRegisterPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

const SplitBrandRegisterWithCaptchaDemo: React.FC = () => {
  const handleRegister = async (payload: any) => {
    console.log('SplitBrand with-captcha register:', payload)
    await new Promise(r => setTimeout(r, 500))
  }

  return (
    <SplitBrandRegisterPage
      onRegister={handleRegister}
      title="分屏品牌注册"
      showCaptcha
      videoSrc="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      brandColor="#3b82f6"
      splitRatio={0.5}
    />
  )
}

export default SplitBrandRegisterWithCaptchaDemo


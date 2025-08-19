import React from 'react'
import { SplitBrandLoginPage } from 'yggjs_rlogin'
import 'yggjs_rlogin/styles.css'

const SplitBrandLoginNoCaptchaDemo: React.FC = () => {
  const handleLogin = async (payload: any) => {
    console.log('SplitBrand no-captcha login:', payload)
    await new Promise(r => setTimeout(r, 500))
  }

  return (
    <SplitBrandLoginPage
      onLogin={handleLogin}
      title="分屏品牌登录"
      showCaptcha={false}
      videoSrc="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      brandColor="#3b82f6"
      splitRatio={0.5}
    />
  )
}

export default SplitBrandLoginNoCaptchaDemo


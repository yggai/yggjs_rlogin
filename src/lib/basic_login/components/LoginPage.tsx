/**
 * 基础风格登录页面组件
 * 基于现有LoginPage重构
 */

import React from 'react'
import { LoginForm } from './LoginForm'
import type { BasicLoginPageProps } from '../types'
import '../styles/BasicLoginPage.css'

export const BasicLoginPage: React.FC<BasicLoginPageProps> = ({
  onLogin,
  title = '登录',
  showCaptcha = false,
  captchaLabel,
  validationRules,
  captchaConfig,
  className = '',
  ...otherProps
}) => {
  return (
    <div
      className={`yggjs-rlogin-page yggjs-basic-login-page ${className}`}
      style={{ minHeight: '100vh', maxHeight: '100vh', minWidth: '100vw', maxWidth: '100vw', overflow: 'hidden' }}
    >
      <div className="yggjs-rlogin-page-inner">
        <LoginForm
          title={title}
          onSubmit={onLogin}
          showCaptcha={showCaptcha}
          captchaLabel={captchaLabel}
          captchaRules={validationRules?.captcha}
          captchaConfig={captchaConfig}
        />
      </div>
    </div>
  )
}

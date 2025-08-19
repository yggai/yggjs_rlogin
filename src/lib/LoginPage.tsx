import React from 'react'
import { LoginForm, LoginFormProps } from './LoginForm'

export type LoginPageProps = {
  onLogin: (payload: { username: string; password: string; captcha?: string }) => void | Promise<void>
  title?: string
  showCaptcha?: boolean
  captchaLabel?: string
  captchaRules?: LoginFormProps['captchaRules']
  captchaConfig?: LoginFormProps['captchaConfig']
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  title = '登录',
  showCaptcha = false,
  captchaLabel,
  captchaRules,
  captchaConfig
}) => {
  return (
    <div
      className="yggjs-rlogin-page"
      style={{ minHeight: '100vh', maxHeight: '100vh', minWidth: '100vw', maxWidth: '100vw', overflow: 'hidden' }}
    >
      <div className="yggjs-rlogin-page-inner">
        <LoginForm
          title={title}
          onSubmit={onLogin}
          showCaptcha={showCaptcha}
          captchaLabel={captchaLabel}
          captchaRules={captchaRules}
          captchaConfig={captchaConfig}
        />
      </div>
    </div>
  )
}


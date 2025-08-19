import React from 'react'
import { LoginForm } from './LoginForm'

export type LoginPageProps = {
  onLogin: (payload: { username: string; password: string }) => void | Promise<void>
  title?: string
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, title = '登录' }) => {
  return (
    <div
      className="yggjs-rlogin-page"
      style={{ minHeight: '100vh', maxHeight: '100vh', minWidth: '100vw', maxWidth: '100vw', overflow: 'hidden' }}
    >
      <div className="yggjs-rlogin-page-inner">
        <LoginForm title={title} onSubmit={onLogin} />
      </div>
    </div>
  )
}


import React from 'react'
import { Rule, validateRules, usernameRule, passwordRule } from './valid'
import './GlassLoginPage.css'

export type GlassLoginPageProps = {
  onLogin: (payload: { username: string; password: string }) => void | Promise<void>
  title?: string
  logo?: string | React.ReactNode
  usernameLabel?: string
  passwordLabel?: string
  submitLabel?: string
  usernameRules?: Rule[]
  passwordRules?: Rule[]
}

export const GlassLoginPage: React.FC<GlassLoginPageProps> = ({
  onLogin,
  title = '登录',
  logo,
  usernameLabel = '用户名',
  passwordLabel = '密码',
  submitLabel = '登录',
  usernameRules = [usernameRule('用户名长度需为 3-36 个字符')],
  passwordRules = [passwordRule('密码长度需为 6-36 个字符')],
}) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [errors, setErrors] = React.useState<{ username?: string; password?: string }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: { username?: string; password?: string } = {}

    const uErr = await validateRules(username, usernameRules)
    if (uErr) errs.username = uErr

    const pErr = await validateRules(password, passwordRules)
    if (pErr) errs.password = pErr

    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    if (!onLogin) return
    try {
      setLoading(true)
      await onLogin({ username, password })
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="yggjs-glass-login-page">
      <div className="yggjs-glass-login-container">
        <div className="yggjs-glass-login-card">
          {/* Logo 区域 */}
          <div className="yggjs-glass-login-logo">
            {logo ? (
              typeof logo === 'string' ? (
                <img src={logo} alt="Logo" style={{ maxHeight: '60px', maxWidth: '200px' }} />
              ) : (
                logo
              )
            ) : (
              <h1 className="yggjs-glass-login-logo-text">{title}</h1>
            )}
          </div>

          {/* 登录表单 */}
          <form className="yggjs-glass-login-form" onSubmit={handleSubmit}>
            {/* 用户名输入框 */}
            <div className="yggjs-glass-login-field">
              <input
                type="text"
                className="yggjs-glass-login-input"
                placeholder={usernameLabel}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                aria-label={usernameLabel}
              />
              {errors.username && (
                <div className="yggjs-glass-login-error" role="alert">
                  {errors.username}
                </div>
              )}
            </div>

            {/* 密码输入框 */}
            <div className="yggjs-glass-login-field">
              <div className="yggjs-glass-login-password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="yggjs-glass-login-input yggjs-glass-login-input--password"
                  placeholder={passwordLabel}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  aria-label={passwordLabel}
                />
                <button
                  type="button"
                  className="yggjs-glass-login-eye-button"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? '隐藏密码' : '显示密码'}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {showPassword ? (
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
              {errors.password && (
                <div className="yggjs-glass-login-error" role="alert">
                  {errors.password}
                </div>
              )}
            </div>

            {/* 登录按钮 */}
            <button
              type="submit"
              className="yggjs-glass-login-button"
              disabled={loading}
            >
              {loading ? '登录中...' : submitLabel}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

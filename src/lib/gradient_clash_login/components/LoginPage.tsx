import React from 'react'
import {
  CaptchaInput,
  validateRules,
  usernameRule,
  passwordRule,
  customRule,
  validateCaptcha
} from '../../shared'
import type { GradientClashLoginPageProps } from '../types'
import '../styles/GradientClashLoginPage.css'

export const GradientClashLoginPage: React.FC<GradientClashLoginPageProps> = ({
  onLogin,
  title = '登录',
  logo,
  usernameLabel = '用户名',
  passwordLabel = '密码',
  submitLabel = '登录',
  validationRules,
  showCaptcha = false,
  captchaLabel = '验证码',
  captchaConfig = {},
  className = '',
  gradient = 'linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4)',
  cardRadius = 20,
}) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [captcha, setCaptcha] = React.useState('')
  const [captchaText, setCaptchaText] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [errors, setErrors] = React.useState<{ username?: string; password?: string; captcha?: string }>({})

  const usernameRules = validationRules?.username || [usernameRule('用户名长度需为 3-36 个字符')]
  const passwordRules = validationRules?.password || [passwordRule('密码长度需为 6-36 个字符')]

  const defaultCaptchaRules = React.useMemo(() => [
    customRule((value: string) => {
      if (!captchaText) return '验证码未生成'
      return validateCaptcha(value, captchaText) ? true : '验证码不正确'
    })
  ], [captchaText])

  const finalCaptchaRules = validationRules?.captcha || defaultCaptchaRules

  const handleCaptchaValidate = React.useCallback((isValid: boolean, code: string) => {
    setCaptchaText(code)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return

    const formData = { username, password, ...(showCaptcha && { captcha }) }
    const rules = { username: usernameRules, password: passwordRules, ...(showCaptcha && { captcha: finalCaptchaRules }) }

    const { isValid, errors: validationErrors } = await validateRules(formData, rules)
    setErrors(validationErrors)
    if (!isValid) return

    setLoading(true)
    try {
      await onLogin(formData)
    } finally {
      setLoading(false)
    }
  }

  const containerClasses = ['yggjs-gradient-clash-login-page', className].filter(Boolean).join(' ')

  return (
    <div className={containerClasses} style={{ backgroundImage: gradient }}>
      <div className="yggjs-gradient-clash-container">
        <div className="yggjs-gradient-clash-card" style={{ borderRadius: cardRadius }}>
          {(logo || title) && (
            <div className="yggjs-gradient-clash-header">
              {logo ? (typeof logo === 'string' ? <h1 className="yggjs-gradient-clash-logo-text">{logo}</h1> : logo) : null}
              {!logo && title && <h1 className="yggjs-gradient-clash-title">{title}</h1>}
            </div>
          )}

          <form className="yggjs-gradient-clash-form" onSubmit={handleSubmit}>
            <div className="yggjs-gradient-clash-field">
              <div className="yggjs-gradient-clash-input-bg" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={usernameLabel}
                className="yggjs-gradient-clash-input"
                disabled={loading}
                aria-label={usernameLabel}
                autoComplete="username"
              />
              {errors.username && <div className="yggjs-gradient-clash-error" role="alert">{errors.username}</div>}
            </div>

            <div className="yggjs-gradient-clash-field">
              <div className="yggjs-gradient-clash-input-bg" />
              <div className="yggjs-gradient-clash-password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={passwordLabel}
                  className="yggjs-gradient-clash-input yggjs-gradient-clash-input--password"
                  disabled={loading}
                  aria-label={passwordLabel}
                  autoComplete="current-password"
                />
                <button type="button" className="yggjs-gradient-clash-eye-button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? '隐藏密码' : '显示密码'} disabled={loading}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {showPassword ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </>
                    )}
                  </svg>
                </button>
              </div>
              {errors.password && <div className="yggjs-gradient-clash-error" role="alert">{errors.password}</div>}
            </div>

            {showCaptcha && (
              <div className="yggjs-gradient-clash-field">
                <div className="yggjs-gradient-clash-input-bg" />
                <CaptchaInput
                  value={captcha}
                  onChange={setCaptcha}
                  onValidate={handleCaptchaValidate}
                  placeholder={captchaLabel}
                  config={captchaConfig}
                  aria-label={captchaLabel}
                  inputClassName="yggjs-gradient-clash-input"
                  disabled={loading}
                />
                {errors.captcha && <div className="yggjs-gradient-clash-error" role="alert">{errors.captcha}</div>}
              </div>
            )}

            <button type="submit" className="yggjs-gradient-clash-button" disabled={loading}>
              {loading ? '登录中...' : submitLabel}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}


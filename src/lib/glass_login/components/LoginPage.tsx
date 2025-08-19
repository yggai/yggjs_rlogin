import React from 'react'
import {
  CaptchaInput,
  validateRules,
  usernameRule,
  passwordRule,
  customRule,
  validateCaptcha
} from '../../shared'
import type { ValidationRule, CaptchaConfig } from '../../shared'
import type { GlassLoginPageProps } from '../types'
import '../styles/GlassLoginPage.css'

// 临时类型定义，保持向后兼容
type Rule = ValidationRule

export const GlassLoginPage: React.FC<GlassLoginPageProps> = ({
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
  blurIntensity = 'medium',
  glassOpacity = 0.1,
  backgroundImage
}) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [captcha, setCaptcha] = React.useState('')
  const [captchaText, setCaptchaText] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [errors, setErrors] = React.useState<{ username?: string; password?: string; captcha?: string }>({})

  // 默认验证规则
  const usernameRules = validationRules?.username || [usernameRule('用户名长度需为 3-36 个字符')]
  const passwordRules = validationRules?.password || [passwordRule('密码长度需为 6-36 个字符')]

  // 默认验证码验证规则
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

    // 验证表单
    const formData = { username, password, ...(showCaptcha && { captcha }) }
    const rules = {
      username: usernameRules,
      password: passwordRules,
      ...(showCaptcha && { captcha: finalCaptchaRules })
    }

    const { isValid, errors: validationErrors } = await validateRules(formData, rules)
    setErrors(validationErrors)

    if (!isValid) return

    setLoading(true)
    try {
      await onLogin(formData)
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  const containerClasses = [
    'yggjs-glass-login-page',
    `yggjs-glass-blur-${blurIntensity}`,
    className
  ].filter(Boolean).join(' ')

  const containerStyle = {
    '--glass-opacity': glassOpacity,
    minHeight: '100vh',
    maxHeight: '100vh',
    minWidth: '100vw',
    maxWidth: '100vw',
    overflow: 'hidden',
    ...(backgroundImage && { backgroundImage: `url(${backgroundImage})` })
  } as React.CSSProperties

  return (
    <div className={containerClasses} style={containerStyle}>
      <div className="yggjs-glass-login-container">
        <div className="yggjs-glass-login-card">
          {/* Logo区域 */}
          {(logo || title) && (
            <div className="yggjs-glass-login-header">
              {logo && (
                <div className="yggjs-glass-login-logo">
                  {typeof logo === 'string' ? (
                    <h1 className="yggjs-glass-login-logo-text">{logo}</h1>
                  ) : (
                    logo
                  )}
                </div>
              )}
              {title && !logo && (
                <h1 className="yggjs-glass-login-title">{title}</h1>
              )}
            </div>
          )}

          {/* 表单区域 */}
          <form className="yggjs-glass-login-form" onSubmit={handleSubmit}>
            {/* 用户名输入框 */}
            <div className="yggjs-glass-login-field">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={usernameLabel}
                className="yggjs-glass-login-input"
                disabled={loading}
                aria-label={usernameLabel}
                autoComplete="username"
              />
              {errors.username && (
                <div className="yggjs-glass-login-error" role="alert">
                  {errors.username}
                </div>
              )}
            </div>

            {/* 密码输入框 */}
            <div className="yggjs-glass-login-field">
              <div className="yggjs-glass-password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={passwordLabel}
                  className="yggjs-glass-login-input yggjs-glass-login-input--password"
                  disabled={loading}
                  aria-label={passwordLabel}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="yggjs-glass-eye-button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  aria-label={showPassword ? '隐藏密码' : '显示密码'}
                >
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
              {errors.password && (
                <div className="yggjs-glass-login-error" role="alert">
                  {errors.password}
                </div>
              )}
            </div>

            {/* 验证码输入框 */}
            {showCaptcha && (
              <div className="yggjs-glass-login-field">
                <CaptchaInput
                  value={captcha}
                  onChange={setCaptcha}
                  onValidate={handleCaptchaValidate}
                  placeholder={captchaLabel}
                  config={captchaConfig}
                  aria-label={captchaLabel}
                  inputClassName="yggjs-glass-login-input"
                  disabled={loading}
                />
                {errors.captcha && (
                  <div className="yggjs-glass-login-error" role="alert">
                    {errors.captcha}
                  </div>
                )}
              </div>
            )}

            {/* 提交按钮 */}
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

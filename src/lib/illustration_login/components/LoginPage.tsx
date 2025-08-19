import React from 'react'
import { CaptchaInput, validateRules, usernameRule, passwordRule, customRule, validateCaptcha } from '../../shared'
import type { IllustrationLoginPageProps } from '../types'
import '../styles/IllustrationLoginPage.css'
import { DefaultRocketIllustration } from './Illustrations'

export const IllustrationLoginPage: React.FC<IllustrationLoginPageProps> = ({
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
  illustrationSvg,
  gradient = 'linear-gradient(180deg, #e0f2fe, #fce7f3)',
  splitRatio = 0.6,
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

  const containerClasses = ['yggjs-illustration-page', className].filter(Boolean).join(' ')

  const leftStyle = { ['--split-pct' as any]: `${Math.round(splitRatio * 100)}%` } as React.CSSProperties

  return (
    <div className={containerClasses} style={{ background: gradient }}>
      <div className="yggjs-illustration-left" style={leftStyle}>
        {typeof illustrationSvg === 'string' ? (
          <div dangerouslySetInnerHTML={{ __html: illustrationSvg }} style={{ width: '100%', height: '100%' }} />
        ) : illustrationSvg ? illustrationSvg : <DefaultRocketIllustration className="yggjs-illustration-art" />}
      </div>
      <div className="yggjs-illustration-right">
        <div className="yggjs-illustration-card">
          {(logo || title) && (
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              {logo ? (typeof logo === 'string' ? <h1 className="yggjs-illustration-title">{logo}</h1> : logo) : null}
              {!logo && title && <h1 className="yggjs-illustration-title">{title}</h1>}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="yggjs-illustration-field">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={usernameLabel}
                className="yggjs-illustration-input"
                disabled={loading}
                aria-label={usernameLabel}
                autoComplete="username"
              />
              {errors.username && <div className="yggjs-illustration-error" role="alert">{errors.username}</div>}
            </div>

            <div className="yggjs-illustration-field">
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={passwordLabel}
                  className="yggjs-illustration-input"
                  disabled={loading}
                  aria-label={passwordLabel}
                  autoComplete="current-password"
                />
                <button type="button" className="yggjs-illustration-button" style={{ width: 40, height: 36, marginLeft: 8 }} onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? '隐藏密码' : '显示密码'} disabled={loading}>
                  {showPassword ? '🙈' : '👀'}
                </button>
              </div>
              {errors.password && <div className="yggjs-illustration-error" role="alert">{errors.password}</div>}
            </div>

            {showCaptcha && (
              <div className="yggjs-illustration-field">
                <CaptchaInput
                  value={captcha}
                  onChange={setCaptcha}
                  onValidate={handleCaptchaValidate}
                  placeholder={captchaLabel}
                  config={captchaConfig}
                  aria-label={captchaLabel}
                  inputClassName="yggjs-illustration-input"
                  disabled={loading}
                />
                {errors.captcha && <div className="yggjs-illustration-error" role="alert">{errors.captcha}</div>}
              </div>
            )}

            <button type="submit" className="yggjs-illustration-button" disabled={loading}>
              {loading ? '登录中...' : submitLabel}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}


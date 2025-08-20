import React from 'react'
import { CaptchaInput, validateRules, usernameRule, passwordRule, customRule, validateCaptcha } from '../../shared'
import type { RetroPixelLoginPageProps } from '../types'
import '../styles/RetroPixelPage.css'

export const RetroPixelLoginPage: React.FC<RetroPixelLoginPageProps> = ({
  onLogin,
  title = 'LOGIN',
  logo,
  usernameLabel = 'USERNAME',
  passwordLabel = 'PASSWORD',
  submitLabel = 'START',
  validationRules,
  showCaptcha = false,
  captchaLabel = 'CAPTCHA',
  captchaConfig = {},
  className = '',
  palette = 'green',
  crtIntensity = 'medium',
  cursorBlink = true,
  fontFamily,
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
    try { await onLogin(formData) } finally { setLoading(false) }
  }

  const containerClasses = ['yggjs-retro-page', `yggjs-retro-intensity-${crtIntensity}`, className].filter(Boolean).join(' ')

  return (
    <div className={containerClasses} data-palette={palette} style={{ ['--retro-font' as any]: fontFamily } as React.CSSProperties}>
      <div className="yggjs-retro-scanlines" />
      <div className="yggjs-retro-vignette" />
      <div className="yggjs-retro-card">
        {(logo || title) && (
          <div style={{ textAlign: 'center', marginBottom: 10 }}>
            {logo ? (typeof logo === 'string' ? <h1 className="yggjs-retro-title">{logo}{cursorBlink && <span className="yggjs-retro-cursor" />}</h1> : logo) : null}
            {!logo && title && <h1 className="yggjs-retro-title">{title}{cursorBlink && <span className="yggjs-retro-cursor" />}</h1>}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="yggjs-retro-field">
            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder={usernameLabel} className="yggjs-retro-input" disabled={loading} aria-label={usernameLabel} autoComplete="username" />
            {errors.username && <div className="yggjs-retro-error" role="alert">{errors.username}</div>}
          </div>
          <div className="yggjs-retro-field">
            <div style={{ display:'flex', gap: 8 }}>
              <input type={showPassword?'text':'password'} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder={passwordLabel} className="yggjs-retro-input" disabled={loading} aria-label={passwordLabel} autoComplete="current-password" />
              <button type="button" className="yggjs-retro-button" style={{ width: 80 }} onClick={()=>setShowPassword(!showPassword)} disabled={loading}>{showPassword?'HIDE':'SHOW'}</button>
            </div>
            {errors.password && <div className="yggjs-retro-error" role="alert">{errors.password}</div>}
          </div>
          {showCaptcha && (
            <div className="yggjs-retro-field">
              <CaptchaInput value={captcha} onChange={setCaptcha} onValidate={handleCaptchaValidate} placeholder={captchaLabel} config={captchaConfig} aria-label={captchaLabel} inputClassName="yggjs-retro-input" disabled={loading} />
              {errors.captcha && <div className="yggjs-retro-error" role="alert">{errors.captcha}</div>}
            </div>
          )}
          <button type="submit" className="yggjs-retro-button" disabled={loading}>{loading?'LOADING...':submitLabel}</button>
        </form>
      </div>
    </div>
  )
}


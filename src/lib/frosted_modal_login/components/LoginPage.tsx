import React from 'react'
import { CaptchaInput, validateRules, usernameRule, passwordRule, customRule, validateCaptcha } from '../../shared'
import type { FrostedModalLoginPageProps } from '../types'
import '../styles/FrostedModalPage.css'

export const FrostedModalLoginPage: React.FC<FrostedModalLoginPageProps> = ({
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
  backdropBlur = 8,
  overlayDarkness = 0.4,
  cardSize = { width: 400, height: 600 },
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

  const containerClasses = ['yggjs-frosted-page', className].filter(Boolean).join(' ')

  return (
    <div className={containerClasses} style={{ ['--overlay-alpha' as any]: overlayDarkness, ['--blur-radius' as any]: `${backdropBlur}px` } as React.CSSProperties}>
      <div className="yggjs-frosted-backdrop" />
      <div className="yggjs-frosted-center">
        <div className="yggjs-frosted-card" style={{ ['--card-w' as any]: `${cardSize.width}px`, ['--card-h' as any]: `${cardSize.height}px` } as React.CSSProperties}>
          {(logo || title) && (
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              {logo ? (typeof logo === 'string' ? <h1 className="yggjs-frosted-title">{logo}</h1> : logo) : null}
              {!logo && title && <h1 className="yggjs-frosted-title">{title}</h1>}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="yggjs-frosted-field">
              <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder={usernameLabel} className="yggjs-frosted-input" disabled={loading} aria-label={usernameLabel} autoComplete="username" />
              {errors.username && <div className="yggjs-frosted-error" role="alert">{errors.username}</div>}
            </div>

            <div className="yggjs-frosted-field">
              <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
                <input type={showPassword?'text':'password'} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder={passwordLabel} className="yggjs-frosted-input" disabled={loading} aria-label={passwordLabel} autoComplete="current-password" />
                <button type="button" className="yggjs-frosted-button" style={{ width: 40, height: 36, marginLeft: 8 }} onClick={()=>setShowPassword(!showPassword)} disabled={loading}>{showPassword?'🙈':'👀'}</button>
              </div>
              {errors.password && <div className="yggjs-frosted-error" role="alert">{errors.password}</div>}
            </div>

            {showCaptcha && (
              <div className="yggjs-frosted-field">
                <CaptchaInput value={captcha} onChange={setCaptcha} onValidate={handleCaptchaValidate} placeholder={captchaLabel} config={captchaConfig} aria-label={captchaLabel} inputClassName="yggjs-frosted-input" disabled={loading} />
                {errors.captcha && <div className="yggjs-frosted-error" role="alert">{errors.captcha}</div>}
              </div>
            )}

            <button type="submit" className="yggjs-frosted-button" disabled={loading}>{loading?'登录中...':submitLabel}</button>
          </form>
        </div>
      </div>
    </div>
  )
}


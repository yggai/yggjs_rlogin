import React from 'react'
import { CaptchaInput, validateRules, usernameRule, passwordRule, customRule, validateCaptcha } from '../../shared'
import type { SplitBrandLoginPageProps } from '../types'
import '../styles/SplitBrandPage.css'

export const SplitBrandLoginPage: React.FC<SplitBrandLoginPageProps> = ({
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
  videoSrc,
  poster,
  autoplay = true,
  loop = true,
  muted = true,
  brandColor = '#3b82f6',
  splitRatio = 0.5,
  overlay,
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

  const containerClasses = ['yggjs-splitbrand-page', className].filter(Boolean).join(' ')
  const leftStyle = { ['--split-pct' as any]: `${Math.round(splitRatio * 100)}%` } as React.CSSProperties

  return (
    <div className={containerClasses}>
      <div className="yggjs-splitbrand-left" style={leftStyle}>
        {videoSrc ? (
          <video className="yggjs-splitbrand-video" autoPlay={autoplay} loop={loop} muted={muted} playsInline poster={poster} src={videoSrc} />
        ) : (
          <div className="yggjs-splitbrand-overlay">{overlay || '品牌视频占位'}</div>
        )}
        {overlay && <div className="yggjs-splitbrand-overlay">{overlay}</div>}
      </div>
      <div className="yggjs-splitbrand-right">
        <div className="yggjs-splitbrand-card" style={{ ['--brand-color' as any]: brandColor }}>
          {(logo || title) && (
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              {logo ? (typeof logo === 'string' ? <h1 className="yggjs-splitbrand-title">{logo}</h1> : logo) : null}
              {!logo && title && <h1 className="yggjs-splitbrand-title">{title}</h1>}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="yggjs-splitbrand-field">
              <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder={usernameLabel} className="yggjs-splitbrand-input" disabled={loading} aria-label={usernameLabel} autoComplete="username" />
              {errors.username && <div className="yggjs-splitbrand-error" role="alert">{errors.username}</div>}
            </div>
            <div className="yggjs-splitbrand-field">
              <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
                <input type={showPassword?'text':'password'} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder={passwordLabel} className="yggjs-splitbrand-input" disabled={loading} aria-label={passwordLabel} autoComplete="current-password" />
                <button type="button" className="yggjs-splitbrand-button" style={{ width: 40, height: 36, marginLeft: 8 }} onClick={()=>setShowPassword(!showPassword)} disabled={loading}>{showPassword?'🙈':'👀'}</button>
              </div>
              {errors.password && <div className="yggjs-splitbrand-error" role="alert">{errors.password}</div>}
            </div>
            {showCaptcha && (
              <div className="yggjs-splitbrand-field">
                <CaptchaInput value={captcha} onChange={setCaptcha} onValidate={handleCaptchaValidate} placeholder={captchaLabel} config={captchaConfig} aria-label={captchaLabel} inputClassName="yggjs-splitbrand-input" disabled={loading} />
                {errors.captcha && <div className="yggjs-splitbrand-error" role="alert">{errors.captcha}</div>}
              </div>
            )}
            <button type="submit" className="yggjs-splitbrand-button" disabled={loading}>{loading?'登录中...':submitLabel}</button>
          </form>
        </div>
      </div>
    </div>
  )
}


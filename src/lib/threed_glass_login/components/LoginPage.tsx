import React from 'react'
import { CaptchaInput, validateRules, usernameRule, passwordRule, customRule, validateCaptcha } from '../../shared'
import type { ThreeDGlassLoginPageProps } from '../types'
import '../styles/ThreeDGlassPage.css'

export const ThreeDGlassLoginPage: React.FC<ThreeDGlassLoginPageProps> = ({
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
  depth = 800,
  tiltMax = 8,
  envLight = 0.35,
}) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [captcha, setCaptcha] = React.useState('')
  const [captchaText, setCaptchaText] = React.useState('')
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

  const containerClasses = ['yggjs-3dglass-page', className].filter(Boolean).join(' ')

  const cardRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width/2
      const cy = rect.top + rect.height/2
      const dx = (e.clientX - cx) / rect.width
      const dy = (e.clientY - cy) / rect.height
      const rotateX = Math.max(Math.min(-dy * tiltMax, tiltMax), -tiltMax)
      const rotateY = Math.max(Math.min(dx * tiltMax, tiltMax), -tiltMax)
      el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }
    const onLeave = () => { el.style.transform = 'rotateX(0deg) rotateY(0deg)' }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [tiltMax])

  return (
    <div className={containerClasses} style={{ ['--depth' as any]: `${depth}px`, ['--envLight' as any]: envLight } as React.CSSProperties}>
      <div className="yggjs-3dglass-clouds" />
      <div className="yggjs-3dglass-center">
        <div className="yggjs-3dglass-card" ref={cardRef}>
          <div className="yggjs-3dglass-reflection" />
          {(logo || title) && (
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              {logo ? (typeof logo === 'string' ? <h1 className="yggjs-3dglass-title">{logo}</h1> : logo) : null}
              {!logo && title && <h1 className="yggjs-3dglass-title">{title}</h1>}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="yggjs-3dglass-field">
              <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder={usernameLabel} className="yggjs-3dglass-input" disabled={loading} aria-label={usernameLabel} autoComplete="username" />
              {errors.username && <div className="yggjs-3dglass-error" role="alert">{errors.username}</div>}
            </div>
            <div className="yggjs-3dglass-field">
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder={passwordLabel} className="yggjs-3dglass-input" disabled={loading} aria-label={passwordLabel} autoComplete="current-password" />
              {errors.password && <div className="yggjs-3dglass-error" role="alert">{errors.password}</div>}
            </div>
            {showCaptcha && (
              <div className="yggjs-3dglass-field">
                <CaptchaInput value={captcha} onChange={setCaptcha} onValidate={handleCaptchaValidate} placeholder={captchaLabel} config={captchaConfig} aria-label={captchaLabel} inputClassName="yggjs-3dglass-input" disabled={loading} />
                {errors.captcha && <div className="yggjs-3dglass-error" role="alert">{errors.captcha}</div>}
              </div>
            )}
            <button type="submit" className="yggjs-3dglass-button" disabled={loading}>{loading?'登录中...':submitLabel}</button>
          </form>
        </div>
      </div>
    </div>
  )
}


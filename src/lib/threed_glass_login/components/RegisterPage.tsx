/** 三维玻璃主题注册页面 */
import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react'
import { CaptchaInput, useForm, validateCaptcha } from '../../shared'
import { requiredUsername, requiredEmail, requiredStrongPassword, requiredConfirmPassword, customRule } from '../../shared/validation/rules'
import type { RegisterPayload } from '../../shared/types'
import type { ThreeDGlassRegisterPageProps } from '../types'
import '../styles/ThreeDGlassPage.css'

export const ThreeDGlassRegisterPage: React.FC<ThreeDGlassRegisterPageProps> = ({
  onRegister,
  onNavigateToLogin,
  showCaptcha = false,
  showEmailField = true,
  showAgreement = true,
  title = '注册',
  subtitle,
  logo,
  usernameLabel = '用户名',
  emailLabel = '邮箱',
  passwordLabel = '密码',
  confirmPasswordLabel = '确认密码',
  captchaLabel = '验证码',
  submitLabel = '注册',
  agreementText = '我已阅读并同意',
  agreementLink = '用户协议',
  loginLinkText = '已有账号？立即登录',
  loading = false,
  disabled = false,
  validationRules,
  captchaConfig = {},
  className = '',
  depth = 800,
  tiltMax = 8,
  envLight = 0.35,
}) => {
  const [captchaText, setCaptchaText] = useState('')

  const rules = useMemo(() => ({
    username: validationRules?.username || requiredUsername(),
    ...(showEmailField && { email: validationRules?.email || requiredEmail() }),
    password: validationRules?.password || requiredStrongPassword(),
    confirmPassword: validationRules?.confirmPassword || requiredConfirmPassword(),
    ...(showCaptcha && {
      captcha: validationRules?.captcha || [
        customRule((value: string) => {
          if (!captchaText) return '验证码未生成'
          return validateCaptcha(value, captchaText) || '验证码不正确'
        })
      ]
    })
  }), [validationRules, showEmailField, showCaptcha, captchaText])

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setValue, setError } = useForm<RegisterPayload & { agreeToTerms?: boolean }>({
    initialValues: {
      username: '',
      ...(showEmailField && { email: '' }),
      password: '',
      confirmPassword: '',
      ...(showCaptcha && { captcha: '' }),
      ...(showAgreement && { agreeToTerms: false })
    },
    validationRules: rules,
    onSubmit: async (formValues) => {
      if (showAgreement && !formValues.agreeToTerms) {
        setError('agreement' as any, '请同意用户协议')
        return
      }
      await onRegister(formValues)
    }
  })

  const handleCaptchaValidate = useCallback((isValid: boolean, code: string) => {
    setCaptchaText(code)
    if (!isValid && values.captcha) {
      setError('captcha', '验证码不正确')
    }
  }, [values.captcha, setError])

  const containerClasses = ['yggjs-3dglass-page', className].filter(Boolean).join(' ')

  const cardRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
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
              {subtitle && <p className="yggjs-3dglass-subtitle">{subtitle}</p>}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* 用户名 */}
            <div className="yggjs-3dglass-field">
              <input
                type="text"
                value={values.username}
                onChange={handleChange('username')}
                onBlur={handleBlur('username')}
                placeholder={usernameLabel}
                className="yggjs-3dglass-input"
                disabled={disabled || loading || isSubmitting}
                aria-label={usernameLabel}
                autoComplete="username"
              />
              {touched.username && errors.username && <div className="yggjs-3dglass-error" role="alert">{errors.username}</div>}
            </div>

            {/* 邮箱 */}
            {showEmailField && (
              <div className="yggjs-3dglass-field">
                <input
                  type="email"
                  value={values.email || ''}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder={emailLabel}
                  className="yggjs-3dglass-input"
                  disabled={disabled || loading || isSubmitting}
                  aria-label={emailLabel}
                  autoComplete="email"
                />
                {touched.email && errors.email && <div className="yggjs-3dglass-error" role="alert">{errors.email}</div>}
              </div>
            )}

            {/* 密码 */}
            <div className="yggjs-3dglass-field">
              <input
                type="password"
                value={values.password}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                placeholder={passwordLabel}
                className="yggjs-3dglass-input"
                disabled={disabled || loading || isSubmitting}
                aria-label={passwordLabel}
                autoComplete="new-password"
              />
              {touched.password && errors.password && <div className="yggjs-3dglass-error" role="alert">{errors.password}</div>}
            </div>

            {/* 确认密码 */}
            <div className="yggjs-3dglass-field">
              <input
                type="password"
                value={values.confirmPassword}
                onChange={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                placeholder={confirmPasswordLabel}
                className="yggjs-3dglass-input"
                disabled={disabled || loading || isSubmitting}
                aria-label={confirmPasswordLabel}
                autoComplete="new-password"
              />
              {touched.confirmPassword && errors.confirmPassword && <div className="yggjs-3dglass-error" role="alert">{errors.confirmPassword}</div>}
            </div>

            {/* 验证码 */}
            {showCaptcha && (
              <div className="yggjs-3dglass-field">
                <CaptchaInput
                  value={values.captcha || ''}
                  onChange={(v) => setValue('captcha', v)}
                  onValidate={handleCaptchaValidate}
                  placeholder={captchaLabel}
                  config={captchaConfig}
                  aria-label={captchaLabel}
                  inputClassName="yggjs-3dglass-input"
                  disabled={disabled || loading || isSubmitting}
                />
                {touched.captcha && errors.captcha && <div className="yggjs-3dglass-error" role="alert">{errors.captcha}</div>}
              </div>
            )}

            {/* 协议 */}
            {showAgreement && (
              <div className="yggjs-3dglass-field">
                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input
                    type="checkbox"
                    checked={values.agreeToTerms || false}
                    onChange={(e) => setValue('agreeToTerms', e.target.checked)}
                    disabled={disabled || loading || isSubmitting}
                  />
                  <span>
                    {agreementText}
                    <a href="#" onClick={(e) => e.preventDefault()} style={{ marginLeft: 4 }}>{agreementLink}</a>
                  </span>
                </label>
                {errors.agreement && <div className="yggjs-3dglass-error" role="alert">{errors.agreement}</div>}
              </div>
            )}

            {/* 提交 */}
            <button type="submit" className="yggjs-3dglass-button" disabled={disabled || loading || isSubmitting}>
              {loading || isSubmitting ? '注册中...' : submitLabel}
            </button>

            {onNavigateToLogin && (
              <div style={{ textAlign: 'center', marginTop: 12 }}>
                <button type="button" className="yggjs-3dglass-button" onClick={onNavigateToLogin} disabled={disabled || loading || isSubmitting}>
                  {loginLinkText}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}


/** 渐变撞色风格注册页面 */
import React, { useMemo, useState, useCallback } from 'react'
import { CaptchaInput, useForm, validateCaptcha } from '../../shared'
import { requiredUsername, requiredEmail, requiredStrongPassword, requiredConfirmPassword, customRule } from '../../shared/validation/rules'
import type { RegisterPayload } from '../../shared/types'
import type { GradientClashRegisterPageProps } from '../types'
import '../styles/GradientClashLoginPage.css'

export const GradientClashRegisterPage: React.FC<GradientClashRegisterPageProps> = ({
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
  gradient = 'linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4)',
  cardRadius = 20,
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

  const containerClasses = ['yggjs-gradient-clash-login-page', className].filter(Boolean).join(' ')

  return (
    <div className={containerClasses} style={{ backgroundImage: gradient }}>
      <div className="yggjs-gradient-clash-container">
        <div className="yggjs-gradient-clash-card" style={{ borderRadius: cardRadius }}>
          {(logo || title) && (
            <div className="yggjs-gradient-clash-header">
              {logo ? (typeof logo === 'string' ? <h1 className="yggjs-gradient-clash-logo-text">{logo}</h1> : logo) : null}
              {!logo && title && <h1 className="yggjs-gradient-clash-title">{title}</h1>}
              {subtitle && <p className="yggjs-gradient-clash-subtitle">{subtitle}</p>}
            </div>
          )}

          <form className="yggjs-gradient-clash-form" onSubmit={handleSubmit}>
            {/* 用户名 */}
            <div className="yggjs-gradient-clash-field">
              <div className="yggjs-gradient-clash-input-bg" />
              <input
                type="text"
                value={values.username}
                onChange={handleChange('username')}
                onBlur={handleBlur('username')}
                placeholder={usernameLabel}
                className="yggjs-gradient-clash-input"
                disabled={disabled || loading || isSubmitting}
                aria-label={usernameLabel}
                autoComplete="username"
              />
              {touched.username && errors.username && <div className="yggjs-gradient-clash-error" role="alert">{errors.username}</div>}
            </div>

            {/* 邮箱 */}
            {showEmailField && (
              <div className="yggjs-gradient-clash-field">
                <div className="yggjs-gradient-clash-input-bg" />
                <input
                  type="email"
                  value={values.email || ''}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder={emailLabel}
                  className="yggjs-gradient-clash-input"
                  disabled={disabled || loading || isSubmitting}
                  aria-label={emailLabel}
                  autoComplete="email"
                />
                {touched.email && errors.email && <div className="yggjs-gradient-clash-error" role="alert">{errors.email}</div>}
              </div>
            )}

            {/* 密码 */}
            <div className="yggjs-gradient-clash-field">
              <div className="yggjs-gradient-clash-input-bg" />
              <div className="yggjs-gradient-clash-password-container">
                <input
                  type="password"
                  value={values.password}
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder={passwordLabel}
                  className="yggjs-gradient-clash-input yggjs-gradient-clash-input--password"
                  disabled={disabled || loading || isSubmitting}
                  aria-label={passwordLabel}
                  autoComplete="new-password"
                />
              </div>
              {touched.password && errors.password && <div className="yggjs-gradient-clash-error" role="alert">{errors.password}</div>}
            </div>

            {/* 确认密码 */}
            <div className="yggjs-gradient-clash-field">
              <div className="yggjs-gradient-clash-input-bg" />
              <div className="yggjs-gradient-clash-password-container">
                <input
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  placeholder={confirmPasswordLabel}
                  className="yggjs-gradient-clash-input yggjs-gradient-clash-input--password"
                  disabled={disabled || loading || isSubmitting}
                  aria-label={confirmPasswordLabel}
                  autoComplete="new-password"
                />
              </div>
              {touched.confirmPassword && errors.confirmPassword && <div className="yggjs-gradient-clash-error" role="alert">{errors.confirmPassword}</div>}
            </div>

            {/* 验证码 */}
            {showCaptcha && (
              <div className="yggjs-gradient-clash-field">
                <div className="yggjs-gradient-clash-input-bg" />
                <CaptchaInput
                  value={values.captcha || ''}
                  onChange={(v) => setValue('captcha', v)}
                  onValidate={handleCaptchaValidate}
                  placeholder={captchaLabel}
                  config={captchaConfig}
                  aria-label={captchaLabel}
                  inputClassName="yggjs-gradient-clash-input"
                  disabled={disabled || loading || isSubmitting}
                />
                {touched.captcha && errors.captcha && <div className="yggjs-gradient-clash-error" role="alert">{errors.captcha}</div>}
              </div>
            )}

            {/* 协议 */}
            {showAgreement && (
              <div className="yggjs-gradient-clash-field">
                <label className="yggjs-gradient-clash-checkbox-container">
                  <input
                    type="checkbox"
                    checked={values.agreeToTerms || false}
                    onChange={(e) => setValue('agreeToTerms', e.target.checked)}
                    disabled={disabled || loading || isSubmitting}
                    className="yggjs-gradient-clash-checkbox"
                  />
                  <span className="yggjs-gradient-clash-checkbox-label">
                    {agreementText}
                    <a href="#" onClick={(e) => e.preventDefault()} className="yggjs-gradient-clash-agreement-link">{agreementLink}</a>
                  </span>
                </label>
                {errors.agreement && <div className="yggjs-gradient-clash-error" role="alert">{errors.agreement}</div>}
              </div>
            )}

            {/* 提交 */}
            <button type="submit" className="yggjs-gradient-clash-button" disabled={disabled || loading || isSubmitting}>
              {loading || isSubmitting ? '注册中...' : submitLabel}
            </button>

            {onNavigateToLogin && (
              <div className="yggjs-gradient-clash-footer" style={{ textAlign: 'center', marginTop: 12 }}>
                <button type="button" className="yggjs-gradient-clash-button" onClick={onNavigateToLogin} disabled={disabled || loading || isSubmitting}>
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


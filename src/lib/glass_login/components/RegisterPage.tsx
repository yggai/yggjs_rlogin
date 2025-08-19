/**
 * 磨砂玻璃风格注册页面组件（TDD 实现）
 */

import React, { useMemo, useState, useCallback } from 'react'
import { CaptchaInput, useForm, validateCaptcha } from '../../shared'
import {
  requiredUsername,
  requiredEmail,
  requiredStrongPassword,
  requiredConfirmPassword,
  customRule
} from '../../shared/validation/rules'
import type { RegisterPayload } from '../../shared/types'
import type { GlassRegisterPageProps } from '../types'
import '../styles/GlassLoginPage.css'

export const GlassRegisterPage: React.FC<GlassRegisterPageProps> = ({
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
  blurIntensity = 'medium',
  glassOpacity = 0.1,
  backgroundImage
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

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValue,
    setError
  } = useForm<RegisterPayload & { agreeToTerms?: boolean }>({
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
              {subtitle && <p className="yggjs-glass-login-subtitle">{subtitle}</p>}
            </div>
          )}

          <form className="yggjs-glass-login-form" onSubmit={handleSubmit}>
            {/* 用户名 */}
            <div className="yggjs-glass-login-field">
              <input
                type="text"
                value={values.username}
                onChange={handleChange('username')}
                onBlur={handleBlur('username')}
                placeholder={usernameLabel}
                className="yggjs-glass-login-input"
                disabled={disabled || loading || isSubmitting}
                aria-label={usernameLabel}
                autoComplete="username"
              />
              {touched.username && errors.username && (
                <div className="yggjs-glass-login-error" role="alert">{errors.username}</div>
              )}
            </div>

            {/* 邮箱 */}
            {showEmailField && (
              <div className="yggjs-glass-login-field">
                <input
                  type="email"
                  value={values.email || ''}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder={emailLabel}
                  className="yggjs-glass-login-input"
                  disabled={disabled || loading || isSubmitting}
                  aria-label={emailLabel}
                  autoComplete="email"
                />
                {touched.email && errors.email && (
                  <div className="yggjs-glass-login-error" role="alert">{errors.email}</div>
                )}
              </div>
            )}

            {/* 密码 */}
            <div className="yggjs-glass-login-field">
              <div className="yggjs-glass-password-container">
                <input
                  type="password"
                  value={values.password}
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder={passwordLabel}
                  className="yggjs-glass-login-input yggjs-glass-login-input--password"
                  disabled={disabled || loading || isSubmitting}
                  aria-label={passwordLabel}
                  autoComplete="new-password"
                />
              </div>
              {touched.password && errors.password && (
                <div className="yggjs-glass-login-error" role="alert">{errors.password}</div>
              )}
            </div>

            {/* 确认密码 */}
            <div className="yggjs-glass-login-field">
              <div className="yggjs-glass-password-container">
                <input
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  placeholder={confirmPasswordLabel}
                  className="yggjs-glass-login-input yggjs-glass-login-input--password"
                  disabled={disabled || loading || isSubmitting}
                  aria-label={confirmPasswordLabel}
                  autoComplete="new-password"
                />
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <div className="yggjs-glass-login-error" role="alert">{errors.confirmPassword}</div>
              )}
            </div>

            {/* 验证码 */}
            {showCaptcha && (
              <div className="yggjs-glass-login-field">
                <CaptchaInput
                  value={values.captcha || ''}
                  onChange={(v) => setValue('captcha', v)}
                  onValidate={handleCaptchaValidate}
                  placeholder={captchaLabel}
                  config={captchaConfig}
                  aria-label={captchaLabel}
                  inputClassName="yggjs-glass-login-input"
                  disabled={disabled || loading || isSubmitting}
                />
                {touched.captcha && errors.captcha && (
                  <div className="yggjs-glass-login-error" role="alert">{errors.captcha}</div>
                )}
              </div>
            )}

            {/* 协议 */}
            {showAgreement && (
              <div className="yggjs-glass-login-field">
                <label className="yggjs-glass-checkbox-container">
                  <input
                    type="checkbox"
                    checked={values.agreeToTerms || false}
                    onChange={(e) => setValue('agreeToTerms', e.target.checked)}
                    disabled={disabled || loading || isSubmitting}
                    className="yggjs-glass-checkbox"
                  />
                  <span className="yggjs-glass-checkbox-label">
                    {agreementText}
                    <a href="#" onClick={(e) => e.preventDefault()} className="yggjs-glass-agreement-link">{agreementLink}</a>
                  </span>
                </label>
                {errors.agreement && (
                  <div className="yggjs-glass-login-error" role="alert">{errors.agreement}</div>
                )}
              </div>
            )}

            {/* 提交 */}
            <button type="submit" className="yggjs-glass-login-button" disabled={disabled || loading || isSubmitting}>
              {loading || isSubmitting ? '注册中...' : submitLabel}
            </button>

            {onNavigateToLogin && (
              <div className="yggjs-glass-login-footer" style={{ textAlign: 'center', marginTop: 12 }}>
                <button type="button" className="yggjs-glass-login-button" onClick={onNavigateToLogin} disabled={disabled || loading || isSubmitting}>
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

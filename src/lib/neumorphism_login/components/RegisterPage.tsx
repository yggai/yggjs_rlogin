/**
 * 新拟态风格注册页面组件
 * 基于TDD开发，提供完整的注册功能
 */

import React, { useState, useCallback, useMemo } from 'react'
import { CaptchaInput, useForm, validateCaptcha } from '../../shared'
import { 
  requiredUsername, 
  requiredEmail, 
  requiredStrongPassword, 
  requiredConfirmPassword,
  customRule 
} from '../../shared/validation/rules'
import type { NeumorphismRegisterPageProps } from '../types'
import type { RegisterPayload } from '../../shared/types'
import '../styles/RegisterPage.css'

export const NeumorphismRegisterPage: React.FC<NeumorphismRegisterPageProps> = React.memo(({
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
  shadowIntensity = 'medium',
  borderRadius = 'medium'
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [captchaText, setCaptchaText] = useState('')

  // 默认验证规则
  const defaultRules = useMemo(() => ({
    username: validationRules?.username || requiredUsername(),
    ...(showEmailField && {
      email: validationRules?.email || requiredEmail()
    }),
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

  // 表单管理
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
    validationRules: defaultRules,
    onSubmit: async (formValues) => {
      // 检查协议同意
      if (showAgreement && !formValues.agreeToTerms) {
        setError('agreement' as any, '请同意用户协议')
        return
      }

      try {
        await onRegister(formValues)
      } catch (error) {
        setError('general' as any, error instanceof Error ? error.message : '注册失败')
      }
    }
  })

  // 验证码验证处理
  const handleCaptchaValidate = useCallback((isValid: boolean, code: string) => {
    setCaptchaText(code)
    if (!isValid && values.captcha) {
      setError('captcha', '验证码不正确')
    }
  }, [values.captcha, setError])

  // 切换密码显示
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev)
  }, [])

  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword(prev => !prev)
  }, [])

  // 处理协议同意变化
  const handleAgreementChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('agreeToTerms', e.target.checked)
    if (e.target.checked && errors.agreement) {
      setError('agreement' as any, '')
    }
  }, [setValue, errors.agreement, setError])

  // 渲染Logo
  const renderLogo = () => {
    if (!logo) return null
    
    if (typeof logo === 'string') {
      return (
        <div className="yggjs-neumorphism-register-logo">
          <h1 className="yggjs-neumorphism-register-logo-text">{logo}</h1>
        </div>
      )
    }
    
    return <div className="yggjs-neumorphism-register-logo">{logo}</div>
  }

  const containerClasses = [
    'yggjs-neumorphism-register-page',
    `yggjs-neumorphism-shadow-${shadowIntensity}`,
    `yggjs-neumorphism-radius-${borderRadius}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClasses}>
      <div className="yggjs-neumorphism-register-container">
        <div className="yggjs-neumorphism-register-card">
          {/* Logo区域 */}
          {(logo || title) && (
            <div className="yggjs-neumorphism-register-header">
              {renderLogo()}
              {title && !logo && (
                <div className="yggjs-neumorphism-register-logo">
                  <h1 className="yggjs-neumorphism-register-logo-text">{title}</h1>
                </div>
              )}
              {subtitle && (
                <p className="yggjs-neumorphism-register-subtitle">{subtitle}</p>
              )}
            </div>
          )}

          {/* 表单区域 */}
          <form className="yggjs-neumorphism-register-form" onSubmit={handleSubmit}>
            {/* 用户名输入框 */}
            <div className="yggjs-neumorphism-register-field">
              <div className="yggjs-neumorphism-input-container">
                <input
                  type="text"
                  value={values.username}
                  onChange={handleChange('username')}
                  onBlur={handleBlur('username')}
                  placeholder={usernameLabel}
                  className="yggjs-neumorphism-register-input"
                  disabled={disabled || loading || isSubmitting}
                  aria-label={usernameLabel}
                  autoComplete="username"
                />
              </div>
              {touched.username && errors.username && (
                <div className="yggjs-neumorphism-register-error" role="alert">
                  {errors.username}
                </div>
              )}
            </div>

            {/* 邮箱输入框 */}
            {showEmailField && (
              <div className="yggjs-neumorphism-register-field">
                <div className="yggjs-neumorphism-input-container">
                  <input
                    type="email"
                    value={values.email || ''}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    placeholder={emailLabel}
                    className="yggjs-neumorphism-register-input"
                    disabled={disabled || loading || isSubmitting}
                    aria-label={emailLabel}
                    autoComplete="email"
                  />
                </div>
                {touched.email && errors.email && (
                  <div className="yggjs-neumorphism-register-error" role="alert">
                    {errors.email}
                  </div>
                )}
              </div>
            )}

            {/* 密码输入框 */}
            <div className="yggjs-neumorphism-register-field">
              <div className="yggjs-neumorphism-input-container yggjs-neumorphism-password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder={passwordLabel}
                  className="yggjs-neumorphism-register-input yggjs-neumorphism-register-input--password"
                  disabled={disabled || loading || isSubmitting}
                  aria-label={passwordLabel}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="yggjs-neumorphism-eye-button"
                  onClick={togglePasswordVisibility}
                  disabled={disabled || loading || isSubmitting}
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
              {touched.password && errors.password && (
                <div className="yggjs-neumorphism-register-error" role="alert">
                  {errors.password}
                </div>
              )}
            </div>

            {/* 确认密码输入框 */}
            <div className="yggjs-neumorphism-register-field">
              <div className="yggjs-neumorphism-input-container yggjs-neumorphism-password-container">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={values.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  placeholder={confirmPasswordLabel}
                  className="yggjs-neumorphism-register-input yggjs-neumorphism-register-input--password"
                  disabled={disabled || loading || isSubmitting}
                  aria-label={confirmPasswordLabel}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="yggjs-neumorphism-eye-button"
                  onClick={toggleConfirmPasswordVisibility}
                  disabled={disabled || loading || isSubmitting}
                  aria-label={showConfirmPassword ? '隐藏密码' : '显示密码'}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {showConfirmPassword ? (
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
              {touched.confirmPassword && errors.confirmPassword && (
                <div className="yggjs-neumorphism-register-error" role="alert">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            {/* 验证码输入框 */}
            {showCaptcha && (
              <div className="yggjs-neumorphism-register-field">
                <div className="yggjs-neumorphism-input-container">
                  <CaptchaInput
                    value={values.captcha || ''}
                    onChange={(value) => setValue('captcha', value)}
                    onValidate={handleCaptchaValidate}
                    placeholder={captchaLabel}
                    config={captchaConfig}
                    aria-label={captchaLabel}
                    inputClassName="yggjs-neumorphism-register-input"
                    disabled={disabled || loading || isSubmitting}
                  />
                </div>
                {touched.captcha && errors.captcha && (
                  <div className="yggjs-neumorphism-register-error" role="alert">
                    {errors.captcha}
                  </div>
                )}
              </div>
            )}

            {/* 用户协议 */}
            {showAgreement && (
              <div className="yggjs-neumorphism-register-field">
                <label className="yggjs-neumorphism-checkbox-container">
                  <input
                    type="checkbox"
                    checked={values.agreeToTerms || false}
                    onChange={handleAgreementChange}
                    disabled={disabled || loading || isSubmitting}
                    className="yggjs-neumorphism-checkbox"
                  />
                  <span className="yggjs-neumorphism-checkbox-label">
                    {agreementText}
                    <a 
                      href="#" 
                      className="yggjs-neumorphism-agreement-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      {agreementLink}
                    </a>
                  </span>
                </label>
                {errors.agreement && (
                  <div className="yggjs-neumorphism-register-error" role="alert">
                    {errors.agreement}
                  </div>
                )}
              </div>
            )}

            {/* 通用错误信息 */}
            {errors.general && (
              <div className="yggjs-neumorphism-register-error" role="alert">
                {errors.general}
              </div>
            )}

            {/* 提交按钮 */}
            <button
              type="submit"
              className="yggjs-neumorphism-register-button"
              disabled={disabled || loading || isSubmitting}
            >
              {loading || isSubmitting ? '注册中...' : submitLabel}
            </button>

            {/* 登录链接 */}
            {onNavigateToLogin && (
              <div className="yggjs-neumorphism-register-footer">
                <button
                  type="button"
                  className="yggjs-neumorphism-link-button"
                  onClick={onNavigateToLogin}
                  disabled={disabled || loading || isSubmitting}
                >
                  {loginLinkText}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
})

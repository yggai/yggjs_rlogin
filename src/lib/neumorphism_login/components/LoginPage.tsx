/**
 * 新拟态风格登录页面组件
 * 重构版本，基于共享基础设施
 */

import React, { useState, useCallback, useMemo } from 'react'
import { CaptchaInput, useForm, validateCaptcha } from '../../shared'
import { requiredUsername, requiredPassword, customRule } from '../../shared/validation/rules'
import type { NeumorphismLoginPageProps } from '../types'
import type { LoginPayload } from '../../shared/types'
import '../styles/LoginPage.css'

export const NeumorphismLoginPage: React.FC<NeumorphismLoginPageProps> = React.memo(({
  onLogin,
  onNavigateToRegister,
  showCaptcha = false,
  showRememberMe = false,
  title = '登录',
  subtitle,
  logo,
  usernameLabel = '用户名',
  passwordLabel = '密码',
  captchaLabel = '验证码',
  submitLabel = '登录',
  rememberMeLabel = '记住我',
  registerLinkText = '没有账号？立即注册',
  loading = false,
  disabled = false,
  validationRules,
  captchaConfig = {},
  className = '',
  shadowIntensity = 'medium',
  borderRadius = 'medium'
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [captchaText, setCaptchaText] = useState('')

  // 默认验证规则
  const defaultRules = useMemo(() => ({
    username: validationRules?.username || requiredUsername(),
    password: validationRules?.password || requiredPassword(),
    ...(showCaptcha && {
      captcha: validationRules?.captcha || [
        customRule((value: string) => {
          if (!captchaText) return '验证码未生成'
          return validateCaptcha(value, captchaText) || '验证码不正确'
        })
      ]
    })
  }), [validationRules, showCaptcha, captchaText])

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
  } = useForm<LoginPayload & { rememberMe?: boolean }>({
    initialValues: {
      username: '',
      password: '',
      ...(showCaptcha && { captcha: '' }),
      ...(showRememberMe && { rememberMe: false })
    },
    validationRules: defaultRules,
    onSubmit: async (formValues) => {
      try {
        await onLogin(formValues)
      } catch (error) {
        setError('general' as any, error instanceof Error ? error.message : '登录失败')
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

  // 处理记住我变化
  const handleRememberMeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('rememberMe', e.target.checked)
  }, [setValue])

  // 渲染Logo
  const renderLogo = () => {
    if (!logo) return null
    
    if (typeof logo === 'string') {
      return (
        <div className="yggjs-neumorphism-login-logo">
          <h1 className="yggjs-neumorphism-login-logo-text">{logo}</h1>
        </div>
      )
    }
    
    return <div className="yggjs-neumorphism-login-logo">{logo}</div>
  }

  const containerClasses = [
    'yggjs-neumorphism-login-page',
    `yggjs-neumorphism-shadow-${shadowIntensity}`,
    `yggjs-neumorphism-radius-${borderRadius}`,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClasses}>
      <div className="yggjs-neumorphism-login-container">
        <div className="yggjs-neumorphism-login-card">
          {/* Logo区域 */}
          {(logo || title) && (
            <div className="yggjs-neumorphism-login-header">
              {renderLogo()}
              {title && !logo && (
                <div className="yggjs-neumorphism-login-logo">
                  <h1 className="yggjs-neumorphism-login-logo-text">{title}</h1>
                </div>
              )}
              {subtitle && (
                <p className="yggjs-neumorphism-login-subtitle">{subtitle}</p>
              )}
            </div>
          )}

          {/* 表单区域 */}
          <form className="yggjs-neumorphism-login-form" onSubmit={handleSubmit}>
            {/* 用户名输入框 */}
            <div className="yggjs-neumorphism-login-field">
              <div className="yggjs-neumorphism-input-container">
                <input
                  type="text"
                  value={values.username}
                  onChange={handleChange('username')}
                  onBlur={handleBlur('username')}
                  placeholder={usernameLabel}
                  className="yggjs-neumorphism-login-input"
                  disabled={disabled || loading || isSubmitting}
                  aria-label={usernameLabel}
                  autoComplete="username"
                />
              </div>
              {touched.username && errors.username && (
                <div className="yggjs-neumorphism-login-error" role="alert">
                  {errors.username}
                </div>
              )}
            </div>

            {/* 密码输入框 */}
            <div className="yggjs-neumorphism-login-field">
              <div className="yggjs-neumorphism-input-container yggjs-neumorphism-password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder={passwordLabel}
                  className="yggjs-neumorphism-login-input yggjs-neumorphism-login-input--password"
                  disabled={disabled || loading || isSubmitting}
                  aria-label={passwordLabel}
                  autoComplete="current-password"
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
                <div className="yggjs-neumorphism-login-error" role="alert">
                  {errors.password}
                </div>
              )}
            </div>

            {/* 验证码输入框 */}
            {showCaptcha && (
              <div className="yggjs-neumorphism-login-field">
                <div className="yggjs-neumorphism-input-container">
                  <CaptchaInput
                    value={values.captcha || ''}
                    onChange={(value) => setValue('captcha', value)}
                    onValidate={handleCaptchaValidate}
                    placeholder={captchaLabel}
                    config={captchaConfig}
                    aria-label={captchaLabel}
                    inputClassName="yggjs-neumorphism-login-input"
                    disabled={disabled || loading || isSubmitting}
                  />
                </div>
                {touched.captcha && errors.captcha && (
                  <div className="yggjs-neumorphism-login-error" role="alert">
                    {errors.captcha}
                  </div>
                )}
              </div>
            )}

            {/* 记住我选项 */}
            {showRememberMe && (
              <div className="yggjs-neumorphism-login-field">
                <label className="yggjs-neumorphism-checkbox-container">
                  <input
                    type="checkbox"
                    checked={values.rememberMe || false}
                    onChange={handleRememberMeChange}
                    disabled={disabled || loading || isSubmitting}
                    className="yggjs-neumorphism-checkbox"
                  />
                  <span className="yggjs-neumorphism-checkbox-label">{rememberMeLabel}</span>
                </label>
              </div>
            )}

            {/* 通用错误信息 */}
            {errors.general && (
              <div className="yggjs-neumorphism-login-error" role="alert">
                {errors.general}
              </div>
            )}

            {/* 提交按钮 */}
            <button
              type="submit"
              className="yggjs-neumorphism-login-button"
              disabled={disabled || loading || isSubmitting}
            >
              {loading || isSubmitting ? '登录中...' : submitLabel}
            </button>

            {/* 注册链接 */}
            {onNavigateToRegister && (
              <div className="yggjs-neumorphism-login-footer">
                <button
                  type="button"
                  className="yggjs-neumorphism-link-button"
                  onClick={onNavigateToRegister}
                  disabled={disabled || loading || isSubmitting}
                >
                  {registerLinkText}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
})

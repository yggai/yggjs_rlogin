/**
 * 共享类型定义
 * 为所有登录注册组件提供统一的类型接口
 */

import { ReactNode } from 'react'

// 基础表单数据类型
export interface LoginPayload {
  username: string
  password: string
  captcha?: string
  rememberMe?: boolean
}

export interface RegisterPayload {
  username: string
  email?: string
  password: string
  confirmPassword: string
  captcha?: string
  agreeToTerms?: boolean
}

// 验证码配置
export interface CaptchaConfig {
  length?: number
  width?: number
  height?: number
  fontSize?: number
  backgroundColor?: string
  textColor?: string
}

// 表单验证规则
export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  validator?: (value: string) => boolean | string
  message?: string
}

export interface ValidationRules {
  username?: ValidationRule[]
  email?: ValidationRule[]
  password?: ValidationRule[]
  confirmPassword?: ValidationRule[]
  captcha?: ValidationRule[]
}

// 登录页面通用接口
export interface BaseLoginPageProps {
  onLogin: (payload: LoginPayload) => void | Promise<void>
  onNavigateToRegister?: () => void
  showCaptcha?: boolean
  showRememberMe?: boolean
  title?: string
  subtitle?: string
  logo?: ReactNode | string
  usernameLabel?: string
  passwordLabel?: string
  captchaLabel?: string
  submitLabel?: string
  rememberMeLabel?: string
  registerLinkText?: string
  loading?: boolean
  disabled?: boolean
  validationRules?: ValidationRules
  captchaConfig?: CaptchaConfig
  className?: string
}

// 注册页面通用接口
export interface BaseRegisterPageProps {
  onRegister: (payload: RegisterPayload) => void | Promise<void>
  onNavigateToLogin?: () => void
  showCaptcha?: boolean
  showEmailField?: boolean
  showAgreement?: boolean
  title?: string
  subtitle?: string
  logo?: ReactNode | string
  usernameLabel?: string
  emailLabel?: string
  passwordLabel?: string
  confirmPasswordLabel?: string
  captchaLabel?: string
  submitLabel?: string
  agreementText?: string
  agreementLink?: string
  loginLinkText?: string
  loading?: boolean
  disabled?: boolean
  validationRules?: ValidationRules
  captchaConfig?: CaptchaConfig
  className?: string
}

// 表单错误状态
export interface FormErrors {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
  captcha?: string
  agreement?: string
  general?: string
  [key: string]: string | undefined
}

// 表单状态
export interface FormState<T> {
  values: T
  errors: FormErrors
  touched: Record<string, boolean>
  isSubmitting: boolean
  isValid: boolean
}

// 主题类型
export type ThemeType = 'basic' | 'minimal' | 'glass' | 'neumorphism'

// 页面类型
export type PageType = 'login' | 'register'

// 导出所有类型
export * from './validation'
export * from './captcha'

/**
 * 共享模块总导出
 * 为所有登录注册组件提供统一的基础设施
 */

// 类型定义 - 避免重复导出
export type {
  LoginPayload,
  RegisterPayload,
  BaseLoginPageProps,
  BaseRegisterPageProps,
  FormErrors,
  FormState,
  ThemeType,
  PageType
} from './types'

// 验证码模块
export { createCaptchaData, validateCaptcha, CaptchaInput } from './captcha'
export type { CaptchaData, CaptchaConfig, CaptchaInputProps } from './types/captcha'

// 表单验证模块
export { validateField, validateRules } from './validation'
export {
  usernameRule,
  passwordRule,
  emailRule,
  confirmPasswordRule,
  customRule,
  requiredUsername,
  requiredEmail,
  requiredPassword,
  requiredStrongPassword,
  requiredConfirmPassword,
  requiredCaptcha
} from './validation/rules'
export type { ValidationRule, ValidationRules, ValidationResult, FieldValidationResult } from './types/validation'

// 共享hooks
export { useForm, useAuth, useDebounce } from './hooks'
export type { UseFormOptions, UseFormReturn } from './hooks/useForm'

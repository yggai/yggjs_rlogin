/**
 * 表单验证相关类型定义
 */

export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  validator?: (value: string, formData?: any) => boolean | string
  message?: string
}

export interface ValidationRules {
  username?: ValidationRule[]
  email?: ValidationRule[]
  password?: ValidationRule[]
  confirmPassword?: ValidationRule[]
  captcha?: ValidationRule[]
}

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export interface FieldValidationResult {
  isValid: boolean
  message?: string
}

// 预定义的验证规则
export interface PredefinedRules {
  required: ValidationRule
  email: ValidationRule
  minLength: (length: number) => ValidationRule
  maxLength: (length: number) => ValidationRule
  pattern: (pattern: RegExp, message: string) => ValidationRule
  passwordStrength: ValidationRule
  confirmPassword: ValidationRule
}

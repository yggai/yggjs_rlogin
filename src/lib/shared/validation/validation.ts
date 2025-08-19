/**
 * 表单验证核心逻辑
 * 重构版本，提升性能和类型安全
 */

import type { ValidationRule, ValidationResult, FieldValidationResult } from '../types/validation'

// 基础验证函数
export const isEmail = (v: string): boolean =>
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v)

export const isUsername = (v: string): boolean => 
  v.length >= 3 && v.length <= 36 && /^[a-zA-Z0-9_-]+$/.test(v)

export const isPassword = (v: string): boolean => 
  v.length >= 6 && v.length <= 36

export const isCaptcha = (v: string): boolean => 
  /^[A-Za-z0-9]{4,8}$/.test(v)

export const isStrongPassword = (v: string): boolean => {
  // 至少包含大小写字母、数字和特殊字符中的三种
  const hasLower = /[a-z]/.test(v)
  const hasUpper = /[A-Z]/.test(v)
  const hasNumber = /\d/.test(v)
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(v)
  
  const strength = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length
  return v.length >= 8 && strength >= 3
}

/**
 * 验证单个字段
 * @param value 字段值
 * @param rules 验证规则数组
 * @param formData 完整表单数据（用于确认密码等场景）
 * @returns 验证结果
 */
export async function validateField(
  value: string, 
  rules: ValidationRule[] = [], 
  formData?: Record<string, any>
): Promise<FieldValidationResult> {
  for (const rule of rules) {
    // required 检查
    if (rule.required && (!value || value.trim() === '')) {
      return {
        isValid: false,
        message: rule.message || '此项为必填'
      }
    }

    // 如果值为空且不是必填，跳过后续验证
    if (!value || value.trim() === '') {
      continue
    }

    const val = value.trim()

    // 长度验证
    if (typeof rule.minLength === 'number' && val.length < rule.minLength) {
      return {
        isValid: false,
        message: rule.message || `长度不能小于 ${rule.minLength} 个字符`
      }
    }

    if (typeof rule.maxLength === 'number' && val.length > rule.maxLength) {
      return {
        isValid: false,
        message: rule.message || `长度不能大于 ${rule.maxLength} 个字符`
      }
    }

    // 正则验证
    if (rule.pattern && !rule.pattern.test(val)) {
      return {
        isValid: false,
        message: rule.message || '格式不正确'
      }
    }

    // 自定义验证器
    if (rule.validator) {
      try {
        const result = await rule.validator(val, formData)
        if (result !== true) {
          return {
            isValid: false,
            message: typeof result === 'string' ? result : (rule.message || '校验未通过')
          }
        }
      } catch (error) {
        return {
          isValid: false,
          message: rule.message || '校验出错'
        }
      }
    }
  }

  return { isValid: true }
}

/**
 * 验证多个字段
 * @param formData 表单数据
 * @param rules 验证规则映射
 * @returns 验证结果
 */
export async function validateRules(
  formData: Record<string, string>,
  rules: Record<string, ValidationRule[]>
): Promise<ValidationResult> {
  const errors: Record<string, string> = {}
  let isValid = true

  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = formData[field] || ''
    const result = await validateField(value, fieldRules, formData)
    
    if (!result.isValid) {
      errors[field] = result.message || '验证失败'
      isValid = false
    }
  }

  return { isValid, errors }
}

/**
 * 预定义验证规则
 * 提供常用的验证规则工厂函数
 */

import type { ValidationRule } from '../types/validation'
import { isEmail, isUsername, isPassword, isStrongPassword, isCaptcha } from './validation'

// 基础规则工厂
export const required = (message = '此项为必填'): ValidationRule => ({ 
  required: true, 
  message 
})

export const minLength = (length: number, message?: string): ValidationRule => ({ 
  minLength: length, 
  message: message || `长度不能小于 ${length} 个字符`
})

export const maxLength = (length: number, message?: string): ValidationRule => ({ 
  maxLength: length, 
  message: message || `长度不能大于 ${length} 个字符`
})

export const pattern = (regex: RegExp, message = '格式不正确'): ValidationRule => ({ 
  pattern: regex, 
  message 
})

// 邮箱验证规则
export const emailRule = (message = '请输入有效邮箱'): ValidationRule => ({
  validator: (value: string) => isEmail(value) || message
})

// 用户名验证规则
export const usernameRule = (message = '用户名长度为3-36个字符，只能包含字母、数字、下划线和连字符'): ValidationRule => ({
  validator: (value: string) => isUsername(value) || message
})

// 密码验证规则
export const passwordRule = (message = '密码长度为6-36个字符'): ValidationRule => ({
  validator: (value: string) => isPassword(value) || message
})

// 强密码验证规则
export const strongPasswordRule = (message = '密码至少8位，需包含大小写字母、数字和特殊字符中的三种'): ValidationRule => ({
  validator: (value: string) => isStrongPassword(value) || message
})

// 确认密码验证规则
export const confirmPasswordRule = (message = '两次输入的密码不一致'): ValidationRule => ({
  validator: (value: string, formData?: any) => {
    if (!formData || !formData.password) return true
    return value === formData.password || message
  }
})

// 验证码验证规则
export const captchaRule = (message = '验证码格式不正确'): ValidationRule => ({
  validator: (value: string) => isCaptcha(value) || message
})

// 自定义验证规则
export const customRule = (
  validator: (value: string, formData?: any) => boolean | string,
  message?: string
): ValidationRule => ({
  validator,
  message
})

// 常用组合规则
export const requiredUsername = () => [
  required('请输入用户名'),
  usernameRule()
]

export const requiredEmail = () => [
  required('请输入邮箱'),
  emailRule()
]

export const requiredPassword = () => [
  required('请输入密码'),
  passwordRule()
]

export const requiredStrongPassword = () => [
  required('请输入密码'),
  strongPasswordRule()
]

export const requiredConfirmPassword = () => [
  required('请确认密码'),
  confirmPasswordRule()
]

export const requiredCaptcha = () => [
  required('请输入验证码'),
  captchaRule()
]

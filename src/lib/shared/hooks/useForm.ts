/**
 * 表单管理hook
 * 提供统一的表单状态管理和验证逻辑
 */

import { useState, useCallback, useMemo } from 'react'
import { validateField } from '../validation/validation'
import type { ValidationRule, FormErrors } from '../types'

export interface UseFormOptions<T> {
  initialValues: T
  validationRules?: Partial<Record<keyof T, ValidationRule[]>>
  onSubmit?: (values: T) => void | Promise<void>
  validateOnChange?: boolean
  validateOnBlur?: boolean
}

export interface UseFormReturn<T> {
  values: T
  errors: FormErrors
  touched: Record<keyof T, boolean>
  isSubmitting: boolean
  isValid: boolean
  setValue: (field: keyof T, value: any) => void
  setError: (field: keyof T, error: string) => void
  clearError: (field: keyof T) => void
  clearErrors: () => void
  handleChange: (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (field: keyof T) => () => void
  handleSubmit: (e?: React.FormEvent) => Promise<void>
  reset: () => void
  validate: (field?: keyof T) => Promise<boolean>
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationRules = {} as Partial<Record<keyof T, ValidationRule[]>>,
  onSubmit,
  validateOnChange = true,
  validateOnBlur = true
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 计算表单是否有效
  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0
  }, [errors])

  // 设置字段值
  const setValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }))
    
    // 如果启用了onChange验证，则验证该字段
    if (validateOnChange && validationRules[field]) {
      validateField(value, validationRules[field], values).then(result => {
        if (result.isValid) {
          setErrors(prev => {
            const newErrors = { ...prev }
            delete newErrors[field as string]
            return newErrors
          })
        } else {
          setErrors(prev => ({ ...prev, [field]: result.message || '验证失败' }))
        }
      })
    }
  }, [validateOnChange, validationRules, values])

  // 设置字段错误
  const setError = useCallback((field: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [field as string]: error }))
  }, [])

  // 清除字段错误
  const clearError = useCallback((field: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field as string]
      return newErrors
    })
  }, [])

  // 清除所有错误
  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  // 处理输入变化
  const handleChange = useCallback((field: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(field, e.target.value)
  }, [setValue])

  // 处理失焦
  const handleBlur = useCallback((field: keyof T) => () => {
    setTouched(prev => ({ ...prev, [field]: true }))
    
    // 如果启用了onBlur验证，则验证该字段
    if (validateOnBlur && validationRules[field]) {
      validateField(values[field], validationRules[field], values).then(result => {
        if (result.isValid) {
          clearError(field)
        } else {
          setError(field, result.message || '验证失败')
        }
      })
    }
  }, [validateOnBlur, validationRules, values, clearError, setError])

  // 验证字段或整个表单
  const validate = useCallback(async (field?: keyof T): Promise<boolean> => {
    if (field) {
      // 验证单个字段
      const rules = validationRules[field]
      if (!rules) return true
      
      const result = await validateField(values[field], rules, values)
      if (result.isValid) {
        clearError(field)
        return true
      } else {
        setError(field, result.message || '验证失败')
        return false
      }
    } else {
      // 验证整个表单
      let isFormValid = true
      const newErrors: FormErrors = {}
      
      for (const [fieldName, rules] of Object.entries(validationRules)) {
        if (rules) {
          const result = await validateField(values[fieldName as keyof T], rules, values)
          if (!result.isValid) {
            newErrors[fieldName] = result.message || '验证失败'
            isFormValid = false
          }
        }
      }
      
      setErrors(newErrors)
      return isFormValid
    }
  }, [validationRules, values, clearError, setError])

  // 处理表单提交
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }
    
    setIsSubmitting(true)
    
    try {
      // 验证整个表单
      const isFormValid = await validate()
      
      if (isFormValid && onSubmit) {
        await onSubmit(values)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [validate, onSubmit, values])

  // 重置表单
  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({} as Record<keyof T, boolean>)
    setIsSubmitting(false)
  }, [initialValues])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    setValue,
    setError,
    clearError,
    clearErrors,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    validate
  }
}

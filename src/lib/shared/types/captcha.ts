/**
 * 验证码相关类型定义
 */

export interface CaptchaData {
  code: string
  imageUrl: string
  timestamp: number
}

export interface CaptchaConfig {
  length?: number
  width?: number
  height?: number
  fontSize?: number
  backgroundColor?: string
  textColor?: string
  noiseLines?: number
  noiseDots?: number
}

export interface CaptchaInputProps {
  value: string
  onChange: (value: string) => void
  onValidate?: (isValid: boolean, value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  config?: CaptchaConfig
  'aria-label'?: string
  inputClassName?: string
}

export interface CaptchaValidationResult {
  isValid: boolean
  message?: string
}

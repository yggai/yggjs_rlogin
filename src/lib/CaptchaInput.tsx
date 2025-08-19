import React, { useState, useEffect } from 'react'
import { createCaptchaData, validateCaptcha, CaptchaConfig, CaptchaData } from './captcha'
import './CaptchaInput.css'

export interface CaptchaInputProps {
  value: string
  onChange: (value: string) => void
  onValidate?: (isValid: boolean, captchaText: string) => void
  placeholder?: string
  className?: string
  config?: CaptchaConfig
  disabled?: boolean
  'aria-label'?: string
  inputClassName?: string // 用于继承父容器的输入框样式
}

export const CaptchaInput: React.FC<CaptchaInputProps> = ({
  value,
  onChange,
  onValidate,
  placeholder = '请输入验证码',
  className = '',
  config = {},
  disabled = false,
  'aria-label': ariaLabel = '验证码',
  inputClassName = ''
}) => {
  const [captchaData, setCaptchaData] = useState<CaptchaData>(() => createCaptchaData(config))

  // 刷新验证码
  const refreshCaptcha = () => {
    const newCaptchaData = createCaptchaData(config)
    setCaptchaData(newCaptchaData)
    onChange('') // 清空输入
    
    // 通知父组件验证码已刷新
    if (onValidate) {
      onValidate(false, newCaptchaData.text)
    }
  }

  // 验证输入
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    onChange(inputValue)
    
    if (onValidate) {
      const isValid = validateCaptcha(inputValue, captchaData.text)
      onValidate(isValid, captchaData.text)
    }
  }

  // 键盘事件处理
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (onValidate) {
        const isValid = validateCaptcha(value, captchaData.text)
        onValidate(isValid, captchaData.text)
      }
    }
  }

  // 初始化时通知父组件当前验证码
  useEffect(() => {
    if (onValidate) {
      onValidate(false, captchaData.text)
    }
  }, []) // 只在组件挂载时执行

  return (
    <div className={`yggjs-captcha-input ${className}`}>
      <div className="yggjs-captcha-input-container">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`yggjs-captcha-input-field ${inputClassName}`}
          disabled={disabled}
          aria-label={ariaLabel}
          autoComplete="off"
          spellCheck={false}
          maxLength={config.length || 4}
        />

        <img
          src={captchaData.imageUrl}
          alt="验证码图片"
          className="yggjs-captcha-image"
          onClick={refreshCaptcha}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              refreshCaptcha()
            }
          }}
          aria-label="点击刷新验证码"
          title="点击刷新验证码"
        />
      </div>
    </div>
  )
}

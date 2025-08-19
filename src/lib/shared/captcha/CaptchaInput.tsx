import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { createCaptchaData, validateCaptcha } from './captcha'
import type { CaptchaInputProps, CaptchaData } from '../types/captcha'
import './CaptchaInputShared.css'

/**
 * 验证码输入组件
 * 优化版本，提升性能和用户体验
 */
export const CaptchaInput: React.FC<CaptchaInputProps> = React.memo(({
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
  // 使用useMemo优化初始验证码生成
  const initialCaptcha = useMemo(() => createCaptchaData(config), [])
  const [captchaData, setCaptchaData] = useState<CaptchaData>(initialCaptcha)

  // 使用useCallback优化刷新函数
  const refreshCaptcha = useCallback(() => {
    const newCaptchaData = createCaptchaData(config)
    setCaptchaData(newCaptchaData)
    onChange('') // 清空输入
    
    // 通知父组件验证码已刷新
    if (onValidate) {
      onValidate(false, newCaptchaData.code)
    }
  }, [config, onChange, onValidate])

  // 优化输入处理
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    onChange(inputValue)
    
    if (onValidate) {
      const isValid = validateCaptcha(inputValue, captchaData.code)
      onValidate(isValid, captchaData.code)
    }
  }, [onChange, onValidate, captchaData.code])

  // 键盘事件处理
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (onValidate) {
        const isValid = validateCaptcha(value, captchaData.code)
        onValidate(isValid, captchaData.code)
      }
    }
  }, [value, captchaData.code, onValidate])

  // 验证码图片键盘事件处理
  const handleImageKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      refreshCaptcha()
    }
  }, [refreshCaptcha])

  // 初始化时通知父组件当前验证码
  useEffect(() => {
    if (onValidate) {
      onValidate(false, captchaData.code)
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
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleImageKeyDown}
          aria-label="点击刷新验证码"
          title="点击刷新验证码"
          style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        />
      </div>
    </div>
  )
})

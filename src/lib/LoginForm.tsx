import React from 'react'
import { Rule, validateRules, usernameRule, passwordRule, customRule } from './valid'
import { CaptchaInput } from './CaptchaInput'
import { CaptchaConfig, validateCaptcha } from './captcha'

export type LoginFormProps = {
  onSubmit?: (payload: { username: string; password: string; captcha?: string }) => void | Promise<void>
  title?: string
  usernameLabel?: string
  passwordLabel?: string
  submitLabel?: string
  className?: string
  style?: React.CSSProperties
  // antd 风格的 rules
  usernameRules?: Rule[]
  passwordRules?: Rule[]
  showCaptcha?: boolean
  captchaLabel?: string
  captchaRules?: Rule[]
  captchaConfig?: CaptchaConfig
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  title = '登录',
  usernameLabel = '账号',
  passwordLabel = '密码',
  submitLabel = '登录',
  className,
  style,
  usernameRules = [usernameRule('账号长度需为 3-36 个字符')],
  passwordRules = [passwordRule('密码长度需为 6-36 个字符')],
  showCaptcha = false,
  captchaLabel = '验证码',
  captchaRules,
  captchaConfig = {},
}) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [captcha, setCaptcha] = React.useState('')
  const [captchaText, setCaptchaText] = React.useState('')
  const [showPwd, setShowPwd] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [errors, setErrors] = React.useState<{ username?: string; password?: string; captcha?: string }>({})

  // 默认验证码验证规则
  const defaultCaptchaRules = React.useMemo(() => [
    customRule((value: string) => {
      if (!captchaText) return '验证码未生成'
      return validateCaptcha(value, captchaText) ? true : '验证码不正确'
    })
  ], [captchaText])

  const finalCaptchaRules = captchaRules || defaultCaptchaRules

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: { username?: string; password?: string; captcha?: string } = {}

    const uErr = await validateRules(username, usernameRules)
    if (uErr) errs.username = uErr

    const pErr = await validateRules(password, passwordRules)
    if (pErr) errs.password = pErr

    if (showCaptcha) {
      const cErr = await validateRules(captcha, finalCaptchaRules)
      if (cErr) errs.captcha = cErr
    }

    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    if (!onSubmit) return
    try {
      setLoading(true)
      const payload = { username, password, ...(showCaptcha && { captcha }) }
      await onSubmit(payload)
    } finally {
      setLoading(false)
    }
  }

  const handleCaptchaValidate = (isValid: boolean, captchaTextValue: string) => {
    setCaptchaText(captchaTextValue)
    if (errors.captcha && isValid) {
      setErrors(prev => ({ ...prev, captcha: undefined }))
    }
  }

  return (
    <form className={`yggjs-rlogin-form ${className ?? ''}`.trim()} style={style} onSubmit={handleSubmit}>
      {title && <div className="yggjs-rlogin-title">{title}</div>}
      <div className="yggjs-rlogin-field">
        <label className="yggjs-rlogin-label" htmlFor="yggjs-rlogin-username">
          {usernameLabel}
        </label>
        <input
          id="yggjs-rlogin-username"
          className="yggjs-rlogin-input"
          aria-invalid={!!errors.username}
          aria-describedby={errors.username ? 'yggjs-rlogin-username-err' : undefined}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={usernameLabel}
          autoComplete="username"
        />
        {errors.username && (
          <div id="yggjs-rlogin-username-err" role="alert" className="yggjs-rlogin-error">
            {errors.username}
          </div>
        )}
      </div>
      <div className="yggjs-rlogin-field">
        <label className="yggjs-rlogin-label" htmlFor="yggjs-rlogin-password">
          {passwordLabel}
        </label>
        <div className="yggjs-rlogin-input-wrap">
          <input
            id="yggjs-rlogin-password"
            className={`yggjs-rlogin-input yggjs-rlogin-input--has-eye`}
            type={showPwd ? 'text' : 'password'}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'yggjs-rlogin-password-err' : undefined}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={passwordLabel}
            autoComplete="current-password"
          />
          <button
            type="button"
            aria-label="切换密码可见"
            className="yggjs-rlogin-eye"
            onClick={() => setShowPwd((s) => !s)}
            title={showPwd ? '隐藏' : '显示'}
          >
            {/* 简单图标：眼睛/闭眼 */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {showPwd ? (
                <path d="M2 12C3.8 7.6 7.6 5 12 5s8.2 2.6 10 7c-1.8 4.4-5.6 7-10 7S3.8 16.4 2 12Zm10 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="#6b7280"/>
              ) : (
                <path d="M3 3l18 18M5.6 6.5C7.5 5.3 9.7 4.6 12 4.6c4.4 0 8.2 2.6 10 6.9-.6 1.5-1.5 2.8-2.6 3.8M7.8 8.7C6 9.7 4.5 11.1 3.6 12.9c1.8 4.3 5.5 6.9 9.9 6.9 1.1 0 2.2-.2 3.3-.5M9.5 9.5a4 4 0 0 0 5.1 5.1" stroke="#6b7280"/>
              )}
            </svg>
          </button>
        </div>
        {errors.password && (
          <div id="yggjs-rlogin-password-err" role="alert" className="yggjs-rlogin-error">
            {errors.password}
          </div>
        )}
      </div>
      {showCaptcha && (
        <div className="yggjs-rlogin-field">
          <label className="yggjs-rlogin-label" htmlFor="yggjs-rlogin-captcha">
            {captchaLabel}
          </label>
          <CaptchaInput
            value={captcha}
            onChange={setCaptcha}
            onValidate={handleCaptchaValidate}
            placeholder={captchaLabel}
            config={captchaConfig}
            aria-label={captchaLabel}
            inputClassName="yggjs-rlogin-input"
          />
          {errors.captcha && (
            <div id="yggjs-rlogin-captcha-err" role="alert" className="yggjs-rlogin-error">
              {errors.captcha}
            </div>
          )}
        </div>
      )}
      <button className="yggjs-rlogin-button" type="submit" disabled={loading}>
        {loading ? '...' : submitLabel}
      </button>
    </form>
  )
}


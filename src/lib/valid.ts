export const isEmail = (v: string): boolean =>
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v)

export const isUsername = (v: string): boolean => v.length >= 3 && v.length <= 36

export const isPassword = (v: string): boolean => v.length >= 6 && v.length <= 36

export const isCaptcha = (v: string): boolean => /^[A-Za-z0-9]{4,8}$/.test(v)

export type Rule = {
  required?: boolean
  min?: number
  max?: number
  len?: number
  pattern?: RegExp
  type?: 'email' | 'username' | 'password' | 'captcha'
  message?: string
  // 自定义校验器：返回 true 表示通过；返回字符串为错误消息；也可返回 Promise
  validator?: (value: string) => true | string | Promise<true | string>
}

export async function validateRules(value: string, rules: Rule[] = []): Promise<string | undefined> {
  for (const rule of rules) {
    // required
    if (rule.required && (!value || value.trim() === '')) {
      return rule.message || '此项为必填'
    }
    const val = value ?? ''
    // len / min / max
    if (typeof rule.len === 'number' && val.length !== rule.len) {
      return rule.message || `长度需为 ${rule.len} 个字符`
    }
    if (typeof rule.min === 'number' && val.length < rule.min) {
      return rule.message || `长度不能小于 ${rule.min} 个字符`
    }
    if (typeof rule.max === 'number' && val.length > rule.max) {
      return rule.message || `长度不能大于 ${rule.max} 个字符`
    }
    // pattern
    if (rule.pattern && !rule.pattern.test(val)) {
      return rule.message || '格式不正确'
    }
    // type
    if (rule.type) {
      const ok =
        rule.type === 'email'
          ? isEmail(val)
          : rule.type === 'username'
          ? isUsername(val)
          : rule.type === 'password'
          ? isPassword(val)
          : rule.type === 'captcha'
          ? isCaptcha(val)
          : true
      if (!ok) {
        return (
          rule.message ||
          (rule.type === 'email'
            ? '请输入有效邮箱'
            : rule.type === 'username'
            ? '用户名不符合要求'
            : rule.type === 'password'
            ? '密码不符合要求'
            : '验证码不符合要求')
        )
      }
    }
    // 自定义 validator
    if (rule.validator) {
      const res = await rule.validator(val)
      if (res !== true) return typeof res === 'string' ? res : '校验未通过'
    }
  }
  return undefined
}

// 内置规则工厂
export const required = (message = '此项为必填'): Rule => ({ required: true, message })
export const minLen = (min: number, message?: string): Rule => ({ min, message })
export const maxLen = (max: number, message?: string): Rule => ({ max, message })
export const length = (len: number, message?: string): Rule => ({ len, message })
export const patternRule = (pattern: RegExp, message?: string): Rule => ({ pattern, message })
export const emailRule = (message = '请输入有效邮箱'): Rule => ({ type: 'email', message })
export const usernameRule = (message = '用户名不符合要求'): Rule => ({ type: 'username', message })
export const passwordRule = (message = '密码不符合要求'): Rule => ({ type: 'password', message })
export const captchaRule = (message = '验证码不符合要求'): Rule => ({ type: 'captcha', message })
export const customRule = (validator: Rule['validator'], message?: string): Rule => ({ validator, message })


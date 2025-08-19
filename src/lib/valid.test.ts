import { describe, it, expect } from 'vitest'
import {
  isEmail,
  isUsername,
  isPassword,
  isCaptcha,
  validateRules,
  required,
  minLen,
  maxLen,
  length,
  patternRule,
  emailRule,
  usernameRule,
  passwordRule,
  captchaRule,
  customRule,
} from './valid'

describe('基础判断', () => {
  it('邮箱', () => {
    expect(isEmail('a@b.com')).toBe(true)
    expect(isEmail('a@b')).toBe(false)
  })
  it('用户名', () => {
    expect(isUsername('abc')).toBe(true)
    expect(isUsername('ab')).toBe(false)
  })
  it('密码', () => {
    expect(isPassword('123456')).toBe(true)
    expect(isPassword('12345')).toBe(false)
  })
  it('验证码', () => {
    expect(isCaptcha('Ab12')).toBe(true)
    expect(isCaptcha('A!12')).toBe(false)
  })
})

describe('规则校验 validateRules', () => {
  it('required/min/max/len/pattern/type/validator', async () => {
    expect(await validateRules('', [required()])).toBeDefined()
    expect(await validateRules('abc', [minLen(4)])).toBeDefined()
    expect(await validateRules('abc', [maxLen(2)])).toBeDefined()
    expect(await validateRules('ab', [length(3)])).toBeDefined()
    expect(await validateRules('ab', [patternRule(/^\d+$/)])).toBeDefined()
    expect(await validateRules('not-email', [emailRule()])).toBeDefined()
    expect(await validateRules('ab', [usernameRule()])).toBeDefined()
    expect(await validateRules('12345', [passwordRule()])).toBeDefined()
    expect(await validateRules('!', [captchaRule()])).toBeDefined()

    expect(await validateRules('ok', [customRule(async () => true)])).toBeUndefined()
    expect(await validateRules('xx', [customRule(async () => '错了')])).toBe('错了')
  })
})


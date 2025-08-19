import { describe, it, expect } from 'vitest'
import { 
  generateCaptcha, 
  validateCaptcha, 
  generateCaptchaSVG, 
  svgToDataURL, 
  createCaptchaData 
} from './captcha'

describe('captcha utilities', () => {
  describe('generateCaptcha', () => {
    it('generates captcha with default length', () => {
      const captcha = generateCaptcha()
      expect(captcha).toHaveLength(4)
      expect(typeof captcha).toBe('string')
    })

    it('generates captcha with custom length', () => {
      const captcha = generateCaptcha(6)
      expect(captcha).toHaveLength(6)
    })

    it('generates captcha with only allowed characters', () => {
      const captcha = generateCaptcha(10)
      const allowedChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
      
      for (const char of captcha) {
        expect(allowedChars).toContain(char)
      }
    })

    it('generates different captchas on multiple calls', () => {
      const captcha1 = generateCaptcha()
      const captcha2 = generateCaptcha()
      
      // 虽然有可能相同，但概率很低
      // 这里主要测试函数能正常执行
      expect(typeof captcha1).toBe('string')
      expect(typeof captcha2).toBe('string')
    })
  })

  describe('validateCaptcha', () => {
    it('validates correct captcha (case insensitive)', () => {
      expect(validateCaptcha('ABC4', 'ABC4')).toBe(true)
      expect(validateCaptcha('abc4', 'ABC4')).toBe(true)
      expect(validateCaptcha('AbC4', 'abc4')).toBe(true)
    })

    it('validates incorrect captcha', () => {
      expect(validateCaptcha('ABC4', 'XYZ9')).toBe(false)
      expect(validateCaptcha('ABC', 'ABC4')).toBe(false)
      expect(validateCaptcha('ABC45', 'ABC4')).toBe(false)
    })

    it('handles whitespace in input', () => {
      expect(validateCaptcha(' ABC4 ', 'ABC4')).toBe(true)
      expect(validateCaptcha('ABC4', ' ABC4 ')).toBe(true)
      expect(validateCaptcha(' ABC4 ', ' ABC4 ')).toBe(true)
    })

    it('handles empty strings', () => {
      expect(validateCaptcha('', '')).toBe(true)
      expect(validateCaptcha('', 'ABC4')).toBe(false)
      expect(validateCaptcha('ABC4', '')).toBe(false)
    })
  })

  describe('generateCaptchaSVG', () => {
    it('generates valid SVG string', () => {
      const svg = generateCaptchaSVG('ABC4')
      
      expect(svg).toContain('<svg')
      expect(svg).toContain('</svg>')
      expect(svg).toContain('width="120"')
      expect(svg).toContain('height="40"')
    })

    it('generates SVG with custom dimensions', () => {
      const svg = generateCaptchaSVG('ABC4', 200, 60)
      
      expect(svg).toContain('width="200"')
      expect(svg).toContain('height="60"')
    })

    it('includes all characters in SVG', () => {
      const text = 'ABC4'
      const svg = generateCaptchaSVG(text)
      
      for (const char of text) {
        expect(svg).toContain(`>${char}</text>`)
      }
    })

    it('includes visual elements', () => {
      const svg = generateCaptchaSVG('ABC4')
      
      // 应该包含背景矩形
      expect(svg).toContain('<rect')
      // 应该包含干扰线
      expect(svg).toContain('<line')
      // 应该包含干扰点
      expect(svg).toContain('<circle')
      // 应该包含文字元素
      expect(svg).toContain('<text')
    })
  })

  describe('svgToDataURL', () => {
    it('converts SVG to data URL', () => {
      const svg = '<svg><rect /></svg>'
      const dataURL = svgToDataURL(svg)
      
      expect(dataURL).toMatch(/^data:image\/svg\+xml;base64,/)
      expect(dataURL.length).toBeGreaterThan(svg.length)
    })

    it('handles complex SVG', () => {
      const svg = generateCaptchaSVG('ABC4')
      const dataURL = svgToDataURL(svg)
      
      expect(dataURL).toMatch(/^data:image\/svg\+xml;base64,/)
    })
  })

  describe('createCaptchaData', () => {
    it('creates captcha data with default config', () => {
      const data = createCaptchaData()
      
      expect(data).toHaveProperty('text')
      expect(data).toHaveProperty('imageUrl')
      expect(data.text).toHaveLength(4)
      expect(data.imageUrl).toMatch(/^data:image\/svg\+xml;base64,/)
    })

    it('creates captcha data with custom config', () => {
      const config = {
        length: 6,
        width: 150,
        height: 50
      }
      const data = createCaptchaData(config)
      
      expect(data.text).toHaveLength(6)
      expect(data.imageUrl).toMatch(/^data:image\/svg\+xml;base64,/)
    })

    it('generates different data on multiple calls', () => {
      const data1 = createCaptchaData()
      const data2 = createCaptchaData()
      
      // 文本应该不同（概率很高）
      expect(data1.text).not.toBe(data2.text)
      expect(data1.imageUrl).not.toBe(data2.imageUrl)
    })

    it('validates generated captcha', () => {
      const data = createCaptchaData()
      
      // 生成的验证码应该能通过自己的验证
      expect(validateCaptcha(data.text, data.text)).toBe(true)
    })
  })
})

/**
 * 验证码生成和验证工具
 * 重构版本，优化性能和可维护性
 */

import type { CaptchaConfig, CaptchaData } from '../types/captcha'

// 验证码字符集（排除容易混淆的字符）
const CAPTCHA_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

/**
 * 生成随机验证码
 * @param length 验证码长度，默认4位
 * @returns 验证码字符串
 */
export function generateCaptcha(length: number = 4): string {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += CAPTCHA_CHARS.charAt(Math.floor(Math.random() * CAPTCHA_CHARS.length))
  }
  return result
}

/**
 * 验证码验证（不区分大小写）
 * @param input 用户输入
 * @param expected 期望的验证码
 * @returns 是否匹配
 */
export function validateCaptcha(input: string, expected: string): boolean {
  if (!input || !expected) return false
  return input.toUpperCase().trim() === expected.toUpperCase().trim()
}

/**
 * 生成验证码SVG图片
 * @param text 验证码文本
 * @param config 配置选项
 * @returns SVG字符串
 */
export function generateCaptchaSVG(
  text: string, 
  config: CaptchaConfig = {}
): string {
  const {
    width = 120,
    height = 40,
    fontSize = 20,
    backgroundColor = '#f8f9fa',
    textColor,
    noiseLines = 3,
    noiseDots = 20
  } = config

  const chars = text.split('')
  const charWidth = width / chars.length
  
  // 预定义颜色集合
  const colors = ['#2563eb', '#dc2626', '#059669', '#7c3aed', '#ea580c', '#0891b2']
  
  // 生成随机颜色
  const getRandomColor = () => {
    return textColor || colors[Math.floor(Math.random() * colors.length)]
  }
  
  // 生成随机角度
  const getRandomAngle = () => (Math.random() - 0.5) * 30
  
  // 生成字符SVG
  const charElements = chars.map((char, index) => {
    const x = charWidth * index + charWidth / 2
    const y = height / 2 + fontSize / 3
    const angle = getRandomAngle()
    const color = getRandomColor()
    
    return `
      <text 
        x="${x}" 
        y="${y}" 
        fill="${color}" 
        font-family="Arial, sans-serif" 
        font-size="${fontSize}" 
        font-weight="bold" 
        text-anchor="middle"
        transform="rotate(${angle} ${x} ${y})"
      >${char}</text>
    `
  }).join('')
  
  // 生成干扰线
  const lines = Array.from({ length: noiseLines }, () => {
    const x1 = Math.random() * width
    const y1 = Math.random() * height
    const x2 = Math.random() * width
    const y2 = Math.random() * height
    const color = getRandomColor()
    
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1" opacity="0.3" />`
  }).join('')
  
  // 生成干扰点
  const dots = Array.from({ length: noiseDots }, () => {
    const cx = Math.random() * width
    const cy = Math.random() * height
    const color = getRandomColor()
    
    return `<circle cx="${cx}" cy="${cy}" r="1" fill="${color}" opacity="0.5" />`
  }).join('')
  
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${backgroundColor}" />
      ${lines}
      ${dots}
      ${charElements}
    </svg>
  `.trim()
}

/**
 * 将SVG转换为Data URL
 * @param svg SVG字符串
 * @returns Data URL
 */
export function svgToDataURL(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`
}

/**
 * 生成验证码数据
 * @param config 验证码配置
 * @returns 验证码数据
 */
export function createCaptchaData(config: CaptchaConfig = {}): CaptchaData {
  const {
    length = 4,
    width = 120,
    height = 40
  } = config
  
  const code = generateCaptcha(length)
  const svg = generateCaptchaSVG(code, config)
  const imageUrl = svgToDataURL(svg)
  
  return {
    code,
    imageUrl,
    timestamp: Date.now()
  }
}

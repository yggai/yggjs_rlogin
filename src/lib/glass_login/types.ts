/**
 * 磨砂玻璃风格组件类型定义
 */

import type { BaseLoginPageProps, BaseRegisterPageProps } from '../shared/types'

// 磨砂玻璃登录页面属性
export interface GlassLoginPageProps extends BaseLoginPageProps {
  // 磨砂玻璃特有的属性
  blurIntensity?: 'light' | 'medium' | 'strong'
  glassOpacity?: number
  backgroundImage?: string
}

// 磨砂玻璃注册页面属性
export interface GlassRegisterPageProps extends BaseRegisterPageProps {
  // 磨砂玻璃特有的属性
  blurIntensity?: 'light' | 'medium' | 'strong'
  glassOpacity?: number
  backgroundImage?: string
}

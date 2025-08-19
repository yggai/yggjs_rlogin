/**
 * 暗黑霓虹风格组件类型定义
 */

import type { BaseLoginPageProps, BaseRegisterPageProps } from '../shared/types'

// 暗黑霓虹登录页面属性
export interface DarkNeonLoginPageProps extends BaseLoginPageProps {
  neonColor?: string // 霓虹主色，默认 #00e6ff
  glowIntensity?: 'soft' | 'medium' | 'strong' // 光晕强度
  backgroundColor?: string // 背景色，默认 #111
}

// 暗黑霓虹注册页面属性
export interface DarkNeonRegisterPageProps extends BaseRegisterPageProps {
  neonColor?: string
  glowIntensity?: 'soft' | 'medium' | 'strong'
  backgroundColor?: string
}


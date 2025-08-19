/**
 * 极简风格组件类型定义
 */

import type { BaseLoginPageProps, BaseRegisterPageProps } from '../shared/types'

// 极简登录页面属性
export interface MinimalLoginPageProps extends BaseLoginPageProps {
  // 极简风格特有的属性
  colorScheme?: 'light' | 'dark' | 'auto'
  accentColor?: string
}

// 极简注册页面属性
export interface MinimalRegisterPageProps extends BaseRegisterPageProps {
  // 极简风格特有的属性
  colorScheme?: 'light' | 'dark' | 'auto'
  accentColor?: string
}

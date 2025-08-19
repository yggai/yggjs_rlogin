/**
 * 基础风格组件类型定义
 */

import type { BaseLoginPageProps, BaseRegisterPageProps } from '../shared/types'

// 基础登录页面属性
export interface BasicLoginPageProps extends BaseLoginPageProps {
  // 基础风格特有的属性
  theme?: 'light' | 'dark'
  primaryColor?: string
  borderRadius?: 'none' | 'small' | 'medium' | 'large'
}

// 基础注册页面属性
export interface BasicRegisterPageProps extends BaseRegisterPageProps {
  // 基础风格特有的属性
  theme?: 'light' | 'dark'
  primaryColor?: string
  borderRadius?: 'none' | 'small' | 'medium' | 'large'
}

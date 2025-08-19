/**
 * 新拟态风格组件类型定义
 */

import type { BaseLoginPageProps, BaseRegisterPageProps } from '../shared/types'

// 新拟态登录页面属性
export interface NeumorphismLoginPageProps extends BaseLoginPageProps {
  // 新拟态特有的属性可以在这里扩展
  shadowIntensity?: 'light' | 'medium' | 'strong'
  borderRadius?: 'small' | 'medium' | 'large'
}

// 新拟态注册页面属性
export interface NeumorphismRegisterPageProps extends BaseRegisterPageProps {
  // 新拟态特有的属性可以在这里扩展
  shadowIntensity?: 'light' | 'medium' | 'strong'
  borderRadius?: 'small' | 'medium' | 'large'
}

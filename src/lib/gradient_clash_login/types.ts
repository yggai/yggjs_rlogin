/**
 * 渐变撞色风格组件类型定义
 */

import type { BaseLoginPageProps, BaseRegisterPageProps } from '../shared/types'

export interface GradientClashLoginPageProps extends BaseLoginPageProps {
  gradient?: string // 背景渐变
  cardRadius?: number // 卡片圆角
}

export interface GradientClashRegisterPageProps extends BaseRegisterPageProps {
  gradient?: string
  cardRadius?: number
}


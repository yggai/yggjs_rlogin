/** 毛玻璃弹窗主题：类型定义 */
import type { BaseLoginPageProps, BaseRegisterPageProps } from '../shared/types'

export interface FrostedModalLoginPageProps extends BaseLoginPageProps {
  backdropBlur?: number // 背景虚化强度，默认 8
  cardSize?: { width: number; height: number } // 弹窗尺寸，默认 400x600
  overlayDarkness?: number // 背景遮罩透明度(0-1)，默认 0.4
}

export interface FrostedModalRegisterPageProps extends BaseRegisterPageProps {
  backdropBlur?: number
  cardSize?: { width: number; height: number }
  overlayDarkness?: number
}


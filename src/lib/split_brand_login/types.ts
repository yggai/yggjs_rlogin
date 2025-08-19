/** 分屏品牌主题：类型定义 */
import type { BaseLoginPageProps, BaseRegisterPageProps } from '../shared/types'
import type { ReactNode } from 'react'

export interface SplitBrandLoginPageProps extends BaseLoginPageProps {
  videoSrc?: string // 品牌视频地址
  poster?: string // 视频封面
  autoplay?: boolean // 是否自动播放（默认 true）
  loop?: boolean // 循环播放（默认 true）
  muted?: boolean // 静音（默认 true）
  brandColor?: string // 品牌主色，用于按钮
  splitRatio?: number // 左侧视频比例（0-1），默认 0.5
  overlay?: ReactNode // 可选覆盖层（如品牌文案）
}

export interface SplitBrandRegisterPageProps extends BaseRegisterPageProps {
  videoSrc?: string
  poster?: string
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  brandColor?: string
  splitRatio?: number
  overlay?: ReactNode
}


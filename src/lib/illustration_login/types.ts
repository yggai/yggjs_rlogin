/** 插画故事主题类型定义 */
import type { BaseLoginPageProps, BaseRegisterPageProps } from '../shared/types'
import type { ReactNode } from 'react'

export interface IllustrationLoginPageProps extends BaseLoginPageProps {
  illustrationSvg?: string | ReactNode // 可自定义插画（SVG 字符串或 React 节点）
  gradient?: string // 背景渐变
  splitRatio?: number // 左侧插画所占百分比（0-1），默认 0.6
}

export interface IllustrationRegisterPageProps extends BaseRegisterPageProps {
  illustrationSvg?: string | ReactNode
  gradient?: string
  splitRatio?: number
}


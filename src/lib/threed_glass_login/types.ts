/** 三维玻璃主题：类型定义 */
import type { BaseLoginPageProps, BaseRegisterPageProps } from '../shared/types'

export interface ThreeDGlassLoginPageProps extends BaseLoginPageProps {
  depth?: number // 3D 透视深度（px），默认 800
  tiltMax?: number // 卡片最大倾斜角度（deg），默认 8
  envLight?: number // 环境光强度(0-1)，默认 0.35
}

export interface ThreeDGlassRegisterPageProps extends BaseRegisterPageProps {
  depth?: number
  tiltMax?: number
  envLight?: number
}

